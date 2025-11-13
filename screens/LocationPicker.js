import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

 const { width, height } = Dimensions.get('window');
  const LocationPicker = ({ navigation, route }) => {
    
    const [location, setLocation] = useState(null);
    const [marker, setMarker] = useState(null);
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [region, setRegion] = useState(null);



    useEffect(() => {
      initializeLocation();
    }, []);

    const initializeLocation = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          setIsLoading(false);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High
        });
        
        const { latitude, longitude } = currentLocation.coords;
        setLocation({ latitude, longitude });
        setMarker({ latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        
        await reverseGeocode(latitude, longitude);
        
      } catch (error) {
        console.error('Location error:', error);
        setError('Failed to get location');
      } finally {
        setIsLoading(false);
      }
    };

    const reverseGeocode = async (latitude, longitude) => {
      try {
        const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (geocode.length > 0) {
          const location = geocode[0];
          const addressString = [
            location.name,
            location.street,
            location.city,
            location.region,
            location.postalCode,
            location.country
          ].filter(Boolean).join(', ');
          setAddress(addressString);
        }
      } catch (error) {
        console.error('Reverse geocode error:', error);
        setAddress('Address not available');
      }
    };

    const searchLocations = async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setIsSearching(true);
        
        // Use Expo's geocoding for search
        const results = await Location.geocodeAsync(query);
        
        if (results.length > 0) {
          const searchResultsWithAddress = await Promise.all(
            results.map(async (result, index) => {
              // Get proper address for each result
              const addressDetails = await Location.reverseGeocodeAsync({
                latitude: result.latitude,
                longitude: result.longitude
              });
              
              let formattedAddress = '';
              if (addressDetails.length > 0) {
                const addr = addressDetails[0];
                formattedAddress = [
                  addr.name,
                  addr.street,
                  addr.city,
                  addr.region,
                  addr.postalCode
                ].filter(Boolean).join(', ');
              }
              
              return {
                id: index.toString(),
                name: query,
                address: formattedAddress || `${result.latitude.toFixed(4)}, ${result.longitude.toFixed(4)}`,
                latitude: result.latitude,
                longitude: result.longitude,
              };
            })
          );
          
          setSearchResults(searchResultsWithAddress);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const handleSearch = (text) => {
      setSearchQuery(text);
      // Debounce search to avoid too many API calls
      const timeoutId = setTimeout(() => {
        searchLocations(text);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    };

    const handleResultSelect = async (result) => {
      const newRegion = {
        latitude: result.latitude,
        longitude: result.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      
      setMarker({ latitude: result.latitude, longitude: result.longitude });
      setRegion(newRegion);
      
      // Get the full address for the selected location
      await reverseGeocode(result.latitude, result.longitude);
      
      setSearchQuery('');
      setSearchResults([]);
    };

    const handleMapPress = async (event) => {
      const { coordinate } = event.nativeEvent;
      setMarker(coordinate);
      await reverseGeocode(coordinate.latitude, coordinate.longitude);
      setSearchResults([]);
    };

    const handleConfirm = () => {
      if (!marker) {
        alert('Please select a location on the map');
        return;
      }
      
   navigation.navigate({
  name: 'AddStudentDetails',
  params: {
    selectedLocation: {
      latitude: marker.latitude,
      longitude: marker.longitude,
      address: address,
    },
  },
  merge: true, 
});

    }

    const renderSearchItem = ({ item }) => (
      <TouchableOpacity 
        style={styles.searchItem}
        onPress={() => handleResultSelect(item)}
      >
        <Ionicons name="location-outline" size={20} color="#666" />
        <View style={styles.searchItemText}>
          <Text style={styles.searchItemName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.searchItemAddress} numberOfLines={2}>
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>
    );

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#07575B" />
          <Text style={styles.loadingText}>Getting your location...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={initializeLocation}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          {/* Header with Back Button and Search */}
          <View style={styles.header}>
                  <View style={styles.searchInputContainer}>
              <Image 
                source={require('../assets/Burger Button.png')} 
                style={styles.backIcon}
                resizeMode="contain"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Try gas stations, ATMs, Trader Joes..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={handleSearch}
                returnKeyType="search"
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <View style={styles.searchResultsContainer}>
              <FlatList
                data={searchResults}
                renderItem={renderSearchItem}
                keyExtractor={item => item.id}
                style={styles.searchResultsList}
                keyboardShouldPersistTaps="handled"
              />
            </View>
          )}

          {/* Loading indicator for search */}
          {isSearching && (
            <View style={styles.searchLoading}>
              <ActivityIndicator size="small" color="#07575B" />
              <Text style={styles.searchLoadingText}>Searching...</Text>
            </View>
          )}

          {/* Map */}
          {region && (
            <MapView
              style={styles.map}
              region={region}
              onPress={handleMapPress}
              showsUserLocation={true}
            >
              {marker && (
                <Marker
                  draggable
                  coordinate={marker}
                  onDragEnd={async (e) => {
                    const newCoord = e.nativeEvent.coordinate;
                    setMarker(newCoord);
                    await reverseGeocode(newCoord.latitude, newCoord.longitude);
                  }}
                />
              )}
            </MapView>
          )}
          
          {/* Selected Address Display */}
          <View style={styles.addressContainer}>
            <Text style={styles.addressLabel}>Selected Location:</Text>
            <Text style={styles.addressText}>
              {address || 'Select a location on the map'}
            </Text>
          </View>
          
          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height:height,
    width:width
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 16,
    right: 16,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 4,
  },
  searchResultsContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 80,
    left: 16,
    right: 16,
    zIndex: 1001,
    backgroundColor: 'white',
    borderRadius: 12,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchResultsList: {
    borderRadius: 12,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchItemText: {
    marginLeft: 12,
    flex: 1,
  },
  searchItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  searchItemAddress: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  searchLoading: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 80,
    left: 16,
    right: 16,
    zIndex: 1001,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchLoadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  map: {
    flex: 1,
  },
  addressContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  addressLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#07575B',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    marginBottom:'15%'
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#07575B',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#07575B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationPicker;