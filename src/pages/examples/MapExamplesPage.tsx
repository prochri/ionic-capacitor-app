import React, { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonFab,
  IonFabButton,
  IonToast,
  isPlatform,
} from "@ionic/react";
import {
  locateOutline,
  navigateOutline,
  map,
  mapOutline,
  layersOutline,
} from "ionicons/icons";
import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapExamplesPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const userMarker = useRef<L.Marker | null>(null);
  const [mapStyle, setMapStyle] = useState("street");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fix Leaflet icon issues
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  // Initialize the map
  useEffect(() => {
    const initDelay = isPlatform("android") ? 1000 : 100;

    const timer = setTimeout(() => {
      if (mapRef.current && !leafletMap.current) {
        // Create a map instance
        leafletMap.current = L.map(mapRef.current, {
          center: [51.505, -0.09],
          zoom: 13,
          zoomControl: true,
          attributionControl: true,
        });

        // Add the default tile layer (OpenStreetMap)
        addTileLayer(mapStyle);

        // Add a default marker
        L.marker([51.505, -0.09])
          .addTo(leafletMap.current)
          .bindPopup("London")
          .openPopup();

        // Force a map resize
        setTimeout(() => {
          if (leafletMap.current) {
            leafletMap.current.invalidateSize(true);
          }
        }, 300);
      }
    }, initDelay);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  // Function to change the map style (tile layer)
  const addTileLayer = (style: string) => {
    if (!leafletMap.current) return;

    // Remove any existing tile layers
    leafletMap.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        leafletMap.current?.removeLayer(layer);
      }
    });

    // Add the selected tile layer
    if (style === "street") {
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(leafletMap.current);
    } else if (style === "satellite") {
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          maxZoom: 19,
        }
      ).addTo(leafletMap.current);
    } else if (style === "terrain") {
      L.tileLayer(
        "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png",
        {
          attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }
      ).addTo(leafletMap.current);
    } else if (style === "light") {
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(leafletMap.current);
    }

    // Update state
    setMapStyle(style);
  };

  // Handle map style change
  const handleMapStyleChange = (style: string) => {
    addTileLayer(style);
  };

  // Get user's current location
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

  // Navigate to a city location
  const navigateToCity = (city: { name: string; lat: number; lng: number }) => {
    if (leafletMap.current) {
      leafletMap.current.setView([city.lat, city.lng], 13);

      // Add a marker for the city
      L.marker([city.lat, city.lng])
        .addTo(leafletMap.current as L.Map)
        .bindPopup(city.name)
        .openPopup();
    }
  };

  // Sample cities
  const cities = [
    { name: "London", lat: 51.505, lng: -0.09 },
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "New York", lat: 40.7128, lng: -74.006 },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Back" />
          </IonButtons>
          <IonTitle>Map Examples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="ion-margin">
          <IonCardContent>
            <h2>Map Components</h2>
            <p>Interactive maps with different styles and markers</p>
          </IonCardContent>
        </IonCard>

        {/* Map Container */}
        <div className="ion-padding">
          <div
            ref={mapRef}
            id="map"
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "8px",
              border: "1px solid #eee",
            }}
          />
        </div>

        {/* Map Style Controls */}
        <div className="ion-padding">
          <IonSegment
            value={mapStyle}
            onIonChange={(e) => handleMapStyleChange(e.detail.value as string)}
          >
            <IonSegmentButton value="street">
              <IonLabel>Street</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="satellite">
              <IonLabel>Satellite</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="terrain">
              <IonLabel>Terrain</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="light">
              <IonLabel>Light</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {/* Cities List */}
        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Popular Cities</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {cities.map((city, index) => (
                <IonItem
                  key={index}
                  button
                  onClick={() => navigateToCity(city)}
                  detail
                >
                  <IonIcon
                    icon={navigateOutline}
                    slot="start"
                    color="primary"
                  />
                  <IonLabel>{city.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Map Features */}
        <IonCard className="ion-margin">
          <IonCardHeader>
            <IonCardTitle>Map Features</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Explore different map features and functionalities</p>
            <IonButton
              expand="block"
              onClick={getCurrentLocation}
              className="ion-margin-top"
            >
              <IonIcon icon={locateOutline} slot="start" />
              Find My Location
            </IonButton>
          </IonCardContent>
        </IonCard>

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

export default MapExamplesPage;
