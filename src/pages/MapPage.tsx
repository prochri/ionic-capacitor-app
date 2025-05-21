import React, { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonFab,
  IonFabButton,
  IonList,
  IonItem,
  IonLabel,
  IonToast,
  isPlatform,
} from "@ionic/react";
import { locateOutline, navigateOutline } from "ionicons/icons";
import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Add CSS to force tile loading
const forceTileStyles = `
  .leaflet-tile {
    visibility: visible !important;
    opacity: 1 !important;
  }
`;

const MapPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const userMarker = useRef<L.Marker | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Initialize the map when the component mounts
  useEffect(() => {
    // Add the forced styles
    const styleEl = document.createElement("style");
    styleEl.appendChild(document.createTextNode(forceTileStyles));
    document.head.appendChild(styleEl);

    // Fix icon issues for both platforms
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    // Longer delay for Android
    const initDelay = isPlatform("android") ? 1500 : 100;

    const timer = setTimeout(() => {
      if (mapRef.current && !leafletMap.current) {
        try {
          // Make sure the map container has a defined height
          mapRef.current.style.height = "70vh";

          // Create a map instance
          leafletMap.current = L.map(mapRef.current, {
            center: [51.505, -0.09],
            zoom: 13,
            zoomControl: true,
            attributionControl: true,
            fadeAnimation: false, // Disable animations for Android
            zoomAnimation: isPlatform("android") ? false : true, // Disable animations for Android
          });

          // Try one of these tile providers - CARTO's light tiles often work better on Android
          // OpenStreetMap
          const osmLayer = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              maxZoom: 19,
              minZoom: 2,
            }
          );

          // CARTO Positron
          const cartoLayer = L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
            {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
              subdomains: "abcd",
              maxZoom: 19,
            }
          );

          // Stamen Terrain
          const stamenLayer = L.tileLayer(
            "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png",
            {
              attribution:
                'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              subdomains: "abcd",
              minZoom: 0,
              maxZoom: 18,
            }
          );

          // ArcGIS
          const esriLayer = L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
            {
              attribution:
                "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
              maxZoom: 19,
            }
          );

          // Try to use CARTO first, with OSM as backup
          if (isPlatform("android")) {
            cartoLayer.addTo(leafletMap.current);
          } else {
            osmLayer.addTo(leafletMap.current);
          }

          // Add a marker
          L.marker([51.505, -0.09])
            .addTo(leafletMap.current)
            .bindPopup("A sample marker")
            .openPopup();

          // Force a map resize after initialization with longer delay for Android
          setTimeout(
            () => {
              if (leafletMap.current) {
                leafletMap.current.invalidateSize(true);

                // Force redraw tiles on Android
                if (isPlatform("android")) {
                  leafletMap.current.eachLayer((layer) => {
                    if (layer instanceof L.TileLayer) {
                      layer.redraw();
                    }
                  });
                }
              }
            },
            isPlatform("android") ? 2000 : 300
          );

          // Show success toast on Android
          if (isPlatform("android")) {
            setToastMessage("Map loaded successfully!");
            setShowToast(true);
          }
        } catch (error) {
          console.error("Error initializing map:", error);
          setToastMessage("Error loading map. Please try again.");
          setShowToast(true);
        }
      }
    }, initDelay);

    // Cleanup function to handle component unmounting
    return () => {
      clearTimeout(timer);
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
      document.head.removeChild(styleEl);
    };
  }, []);

  // Function to handle visibility changes and resize the map
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && leafletMap.current) {
        setTimeout(
          () => {
            leafletMap.current?.invalidateSize(true);

            // Force redraw tiles on Android
            if (isPlatform("android") && leafletMap.current) {
              leafletMap.current.eachLayer((layer) => {
                if (layer instanceof L.TileLayer) {
                  layer.redraw();
                }
              });
            }
          },
          isPlatform("android") ? 1000 : 300
        );
      }
    };

    const handleResize = () => {
      if (leafletMap.current) {
        setTimeout(() => {
          leafletMap.current?.invalidateSize(true);
        }, 300);
      }
    };

    // Try to reload tiles when returning to the tab
    const handleTabChange = () => {
      if (leafletMap.current) {
        // Force redraw tiles
        leafletMap.current.invalidateSize(true);

        // If on Android, try more aggressive tile refresh
        if (isPlatform("android")) {
          // Get all tile layers
          leafletMap.current.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
              // Redraw the layer
              layer.redraw();
            }
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);
    document.addEventListener("ionTabsDidChange", handleTabChange);

    // Android-specific
    if (isPlatform("android")) {
      document.addEventListener("resume", handleVisibilityChange);

      // If using Capacitor, add app-specific listeners
      if (Capacitor.isNativePlatform()) {
        document.addEventListener("capacitor-resume", handleVisibilityChange);
        document.addEventListener("capacitor-resize", handleResize);
      }
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("ionTabsDidChange", handleTabChange);

      if (isPlatform("android")) {
        document.removeEventListener("resume", handleVisibilityChange);

        if (Capacitor.isNativePlatform()) {
          document.removeEventListener(
            "capacitor-resume",
            handleVisibilityChange
          );
          document.removeEventListener("capacitor-resize", handleResize);
        }
      }
    };
  }, []);

  // Function to get and show user's current location
  const getCurrentLocation = async () => {
    try {
      // Request permissions first on Android
      if (isPlatform("android") && Capacitor.isNativePlatform()) {
        const permResult = await Geolocation.requestPermissions();
        if (permResult.location !== "granted") {
          setToastMessage(
            "Location permission is required to use this feature"
          );
          setShowToast(true);
          return;
        }
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      const { latitude, longitude } = position.coords;

      if (leafletMap.current) {
        // Center the map on the user's location
        leafletMap.current.setView([latitude, longitude], 15);

        // Add or update the user marker
        if (userMarker.current) {
          userMarker.current.setLatLng([latitude, longitude]);
        } else {
          userMarker.current = L.marker([latitude, longitude])
            .addTo(leafletMap.current)
            .bindPopup("You are here")
            .openPopup();
        }
      }
    } catch (error) {
      console.error("Error getting location", error);
      setToastMessage(
        "Could not get your location. Please check your GPS settings."
      );
      setShowToast(true);
    }
  };

  // Define some sample locations
  const sampleLocations = [
    { name: "Eiffel Tower", lat: 48.8584, lng: 2.2945 },
    { name: "Statue of Liberty", lat: 40.6892, lng: -74.0445 },
    { name: "Sydney Opera House", lat: -33.8568, lng: 151.2153 },
    { name: "Taj Mahal", lat: 27.1751, lng: 78.0421 },
  ];

  // Function to navigate to a sample location
  const navigateToLocation = (lat: number, lng: number, name: string) => {
    if (leafletMap.current) {
      leafletMap.current.setView([lat, lng], 15);

      // Add a marker at the selected location
      L.marker([lat, lng])
        .addTo(leafletMap.current)
        .bindPopup(`${name}`)
        .openPopup();
    }
  };

  // Function to try different tile providers
  const switchTileProvider = () => {
    if (!leafletMap.current) return;

    // Remove all existing tile layers
    leafletMap.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        leafletMap.current?.removeLayer(layer);
      }
    });

    // Try CartoDB tiles (often work better on Android)
    const cartoLayer = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    );

    cartoLayer.addTo(leafletMap.current);

    setTimeout(() => {
      if (leafletMap.current) {
        leafletMap.current.invalidateSize(true);
      }
    }, 500);

    setToastMessage("Switched to CARTO map tiles");
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Map container with fixed position to avoid Android rendering issues */}
        <div
          ref={mapRef}
          id="map"
          style={{
            width: "100%",
            height: "70vh",
            backgroundColor: "#f0f0f0",
            position: "relative",
            zIndex: 1,
          }}
        />

        {/* Location list */}
        <IonList>
          <IonItem>
            <IonLabel>
              <strong>Famous Landmarks</strong>
            </IonLabel>
          </IonItem>
          {sampleLocations.map((location, index) => (
            <IonItem
              key={index}
              button
              onClick={() =>
                navigateToLocation(location.lat, location.lng, location.name)
              }
            >
              <IonIcon icon={navigateOutline} slot="start" />
              <IonLabel>{location.name}</IonLabel>
            </IonItem>
          ))}
          <IonItem button onClick={switchTileProvider}>
            <IonLabel color="primary">Try Different Map Style</IonLabel>
          </IonItem>
        </IonList>

        {/* Floating action button for current location */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={getCurrentLocation}>
            <IonIcon icon={locateOutline} />
          </IonFabButton>
        </IonFab>

        {/* Toast for status messages */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
