import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonChip,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonSkeletonText,
  IonSegment,
  IonSegmentButton,
  IonBadge,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  searchOutline,
  filterOutline,
  closeCircleOutline,
  starOutline,
  star,
  heartOutline,
} from "ionicons/icons";
import { RefresherEventDetail } from "@ionic/core";

// Sample data
const sampleItems = [
  {
    id: 1,
    name: "Apple",
    category: "Fruit",
    price: 1.99,
    rating: 4.5,
    image: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
  },
  {
    id: 2,
    name: "Banana",
    category: "Fruit",
    price: 0.99,
    rating: 4.2,
    image: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
  },
  {
    id: 3,
    name: "Orange",
    category: "Fruit",
    price: 1.49,
    rating: 4.0,
    image: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
  },
  {
    id: 4,
    name: "Carrot",
    category: "Vegetable",
    price: 0.79,
    rating: 3.8,
    image: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
  },
  {
    id: 5,
    name: "Broccoli",
    category: "Vegetable",
    price: 1.29,
    rating: 3.5,
    image: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
  },
  {
    id: 6,
    name: "Spinach",
    category: "Vegetable",
    price: 0.89,
    rating: 4.1,
    image: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
  },
  {
    id: 7,
    name: "Chicken",
    category: "Meat",
    price: 5.99,
    rating: 4.7,
    image: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
  },
  {
    id: 8,
    name: "Beef",
    category: "Meat",
    price: 7.99,
    rating: 4.3,
    image: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
  },
  {
    id: 9,
    name: "Milk",
    category: "Dairy",
    price: 2.49,
    rating: 4.4,
    image: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
  },
  {
    id: 10,
    name: "Cheese",
    category: "Dairy",
    price: 3.99,
    rating: 4.6,
    image: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
  },
];

const SearchExamplesPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState(sampleItems);
  const [searchMode, setSearchMode] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<number[]>([]);

  // Handle search
  useEffect(() => {
    if (searchText === "") {
      setFilteredItems(sampleItems);
      return;
    }

    const filtered = sampleItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      return matchesSearch && matchesCategory;
    });

    setFilteredItems(filtered);
  }, [searchText, selectedCategories]);

  // Simulate loading when view enters
  useIonViewWillEnter(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  });

  // Handle pull to refresh
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      // Simulate data refresh
      setFilteredItems([...sampleItems]);
      event.detail.complete();
    }, 1500);
  };

  // Toggle category filter
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    if (favoriteItems.includes(id)) {
      setFavoriteItems(favoriteItems.filter((itemId) => itemId !== id));
    } else {
      setFavoriteItems([...favoriteItems, id]);
    }
  };

  // Get unique categories
  const categories = Array.from(
    new Set(sampleItems.map((item) => item.category))
  );

  // Clear all filters
  const clearFilters = () => {
    setSearchText("");
    setSelectedCategories([]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Back" />
          </IonButtons>
          <IonTitle>Search Examples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonCard className="ion-margin">
          <IonCardContent>
            <IonText>
              <h2>Search Components</h2>
              <p>Various search interfaces and filtering options</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonSegment
          value={searchMode}
          onIonChange={(e) => setSearchMode(e.detail.value as string)}
        >
          <IonSegmentButton value="basic">
            <IonLabel>Basic</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="filtered">
            <IonLabel>Filtered</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="advanced">
            <IonLabel>Advanced</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Basic Search */}
        {searchMode === "basic" && (
          <div className="ion-padding">
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              placeholder="Search items..."
              animated={true}
            ></IonSearchbar>

            <IonList>
              {isLoading
                ? // Skeleton loading UI
                  Array.from({ length: 5 }).map((_, index) => (
                    <IonItem key={index}>
                      <IonAvatar slot="start">
                        <IonSkeletonText animated />
                      </IonAvatar>
                      <IonLabel>
                        <h3>
                          <IonSkeletonText animated style={{ width: "50%" }} />
                        </h3>
                        <p>
                          <IonSkeletonText animated style={{ width: "80%" }} />
                        </p>
                      </IonLabel>
                    </IonItem>
                  ))
                : filteredItems.map((item) => (
                    <IonItem key={item.id}>
                      <IonAvatar slot="start">
                        <img src={item.image} alt={item.name} />
                      </IonAvatar>
                      <IonLabel>
                        <h2>{item.name}</h2>
                        <p>
                          {item.category} - ${item.price.toFixed(2)}
                        </p>
                      </IonLabel>
                      <IonIcon
                        slot="end"
                        icon={
                          favoriteItems.includes(item.id) ? star : starOutline
                        }
                        onClick={() => toggleFavorite(item.id)}
                      />
                    </IonItem>
                  ))}

              {!isLoading && filteredItems.length === 0 && (
                <IonItem>
                  <IonLabel className="ion-text-center">
                    <p>No items found</p>
                  </IonLabel>
                </IonItem>
              )}
            </IonList>
          </div>
        )}

        {/* Filtered Search */}
        {searchMode === "filtered" && (
          <div className="ion-padding">
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              placeholder="Search items..."
              animated={true}
              showCancelButton="focus"
            ></IonSearchbar>

            <div className="ion-padding-vertical">
              <div className="ion-padding-bottom">
                <IonText>
                  <h3>Categories</h3>
                </IonText>
              </div>

              {categories.map((category) => (
                <IonChip
                  key={category}
                  color={
                    selectedCategories.includes(category) ? "primary" : "medium"
                  }
                  outline={!selectedCategories.includes(category)}
                  onClick={() => toggleCategory(category)}
                >
                  <IonLabel>{category}</IonLabel>
                </IonChip>
              ))}

              {selectedCategories.length > 0 && (
                <IonChip color="danger" onClick={clearFilters}>
                  <IonLabel>Clear All</IonLabel>
                  <IonIcon icon={closeCircleOutline} />
                </IonChip>
              )}
            </div>

            <IonList>
              {isLoading
                ? // Skeleton loading UI
                  Array.from({ length: 5 }).map((_, index) => (
                    <IonItem key={index}>
                      <IonAvatar slot="start">
                        <IonSkeletonText animated />
                      </IonAvatar>
                      <IonLabel>
                        <h3>
                          <IonSkeletonText animated style={{ width: "50%" }} />
                        </h3>
                        <p>
                          <IonSkeletonText animated style={{ width: "80%" }} />
                        </p>
                      </IonLabel>
                    </IonItem>
                  ))
                : filteredItems.map((item) => (
                    <IonItemSliding key={item.id}>
                      <IonItem>
                        <IonAvatar slot="start">
                          <img src={item.image} alt={item.name} />
                        </IonAvatar>
                        <IonLabel>
                          <h2>{item.name}</h2>
                          <p>
                            {item.category} - ${item.price.toFixed(2)}
                          </p>
                        </IonLabel>
                        <IonBadge color="success" slot="end">
                          {item.rating.toFixed(1)}
                        </IonBadge>
                      </IonItem>
                      <IonItemOptions side="end">
                        <IonItemOption
                          color="primary"
                          onClick={() => toggleFavorite(item.id)}
                        >
                          <IonIcon slot="icon-only" icon={heartOutline} />
                        </IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                  ))}

              {!isLoading && filteredItems.length === 0 && (
                <IonItem>
                  <IonLabel className="ion-text-center">
                    <p>No items found</p>
                  </IonLabel>
                </IonItem>
              )}
            </IonList>
          </div>
        )}

        {/* Advanced Search */}
        {searchMode === "advanced" && (
          <div className="ion-padding">
            <IonGrid>
              <IonRow>
                <IonCol size="10">
                  <IonSearchbar
                    value={searchText}
                    onIonChange={(e) => setSearchText(e.detail.value!)}
                    placeholder="Search items..."
                    animated={true}
                    debounce={500}
                  ></IonSearchbar>
                </IonCol>
                <IonCol
                  size="2"
                  className="ion-align-self-center ion-text-center"
                >
                  <IonIcon icon={filterOutline} size="large" color="primary" />
                </IonCol>
              </IonRow>
            </IonGrid>

            <div className="ion-padding-vertical">
              <div className="ion-padding-bottom">
                <IonText>
                  <h3>Categories</h3>
                </IonText>
              </div>

              {categories.map((category) => (
                <IonChip
                  key={category}
                  color={
                    selectedCategories.includes(category) ? "primary" : "medium"
                  }
                  outline={!selectedCategories.includes(category)}
                  onClick={() => toggleCategory(category)}
                >
                  <IonLabel>{category}</IonLabel>
                </IonChip>
              ))}

              {selectedCategories.length > 0 && (
                <IonChip color="danger" onClick={clearFilters}>
                  <IonLabel>Clear All</IonLabel>
                  <IonIcon icon={closeCircleOutline} />
                </IonChip>
              )}
            </div>

            <IonGrid>
              {isLoading ? (
                // Grid skeleton loading UI
                Array.from({ length: 4 }).map((_, rowIndex) => (
                  <IonRow key={rowIndex}>
                    {Array.from({ length: 2 }).map((_, colIndex) => (
                      <IonCol size="6" key={colIndex}>
                        <IonCard>
                          <div style={{ height: "120px" }}>
                            <IonSkeletonText
                              animated
                              style={{ width: "100%", height: "100%" }}
                            />
                          </div>
                          <IonCardContent>
                            <IonSkeletonText
                              animated
                              style={{ width: "70%" }}
                            />
                            <IonSkeletonText
                              animated
                              style={{ width: "40%" }}
                            />
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                    ))}
                  </IonRow>
                ))
              ) : (
                <IonRow>
                  {filteredItems.map((item) => (
                    <IonCol size="6" key={item.id}>
                      <IonCard>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                        <IonCardHeader>
                          <IonCardTitle>{item.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <p>{item.category}</p>
                          <div
                            className="ion-padding-vertical"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <strong>${item.price.toFixed(2)}</strong>
                            <span>
                              <IonIcon
                                icon={
                                  favoriteItems.includes(item.id)
                                    ? star
                                    : starOutline
                                }
                                color="warning"
                                onClick={() => toggleFavorite(item.id)}
                              />
                              {item.rating.toFixed(1)}
                            </span>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              )}

              {!isLoading && filteredItems.length === 0 && (
                <IonRow>
                  <IonCol>
                    <IonCard>
                      <IonCardContent className="ion-text-center">
                        <p>No items found</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              )}
            </IonGrid>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SearchExamplesPage;
