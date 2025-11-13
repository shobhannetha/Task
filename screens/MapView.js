import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  TextInput,
  FlatList,
  Image
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const MapViewScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [students, setStudents] = useState([]);

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://https-githubcom-shobhannetha-taskbackend-production-8aed.up.railway.app/getstudents/getstudent");
      const data = await res.json();
      
      // Ensure each student has a unique ID and proper coordinates
      const formattedStudents = data.map((student, index) => ({
        id: student.id || student._id || `student-${index}-${Date.now()}`,
        name: student.name || 'Unknown Student',
        address: student.address || student.Address || 'Address not available',
        latitude: parseFloat(student.latitude) || student.location_lat || (17.3850 + (Math.random() * 0.1 - 0.05)), // Hyderabad center with some variation
        longitude: parseFloat(student.longitude) || student.location_lng || (78.4867 + (Math.random() * 0.1 - 0.05)),
      }));
      
      setStudents(formattedStudents);
      console.log('Fetched students:', formattedStudents.length);
      
    } catch (err) {
      console.error("Error fetching students:", err);
      // Fallback to mock data if API fails
      setStudents([
        {
          id: '1',
          name: 'Trader Jocs',
          address: '123 Alameda St, Banjara Hills, Hyderabad',
          latitude: 17.4156,
          longitude: 78.4347,
        },
        {
          id: '2',
          name: 'Micabel',
          address: '456 Squirrel St, Jubilee Hills, Hyderabad',
          latitude: 17.4330,
          longitude: 78.4077,
        },
        {
          id: '3',
          name: 'Alameda St',
          address: '789 Alameda St, Hitech City, Hyderabad',
          latitude: 17.4474,
          longitude: 78.3765,
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

    } catch (error) {
      console.error('Location error:', error);
      setError('Failed to get location');
    }
  };

  const searchLocations = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.address.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const timeoutId = setTimeout(() => {
      searchLocations(text);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleResultSelect = (student) => {
    const newRegion = {
      latitude: student.latitude,
      longitude: student.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(newRegion);
    setSelectedLocation(student);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleMarkerPress = (student) => {
    setSelectedLocation(student);
  };

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => handleResultSelect(item)}
    >
      <Ionicons name="location-outline" size={20} color="#666" />
      <View style={styles.searchItemText}>
        <Text style={styles.searchItemName}>{item.name}</Text>
        <Text style={styles.searchItemAddress}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  // Safe marker render function
  const renderMarkers = () => {
    if (!students || students.length === 0) {
      return null;
    }

    return students.map((student) => {
      // Ensure we have valid coordinates
      if (!student.latitude || !student.longitude) {
        console.warn('Invalid coordinates for student:', student.name);
        return null;
      }

      return (
        <Marker
          key={student.id} // This should now be unique
          coordinate={{
            latitude: student.latitude,
            longitude: student.longitude,
          }}
          title={student.name}
          description={student.address}
          onPress={() => handleMarkerPress(student)}
        >
          <View style={styles.markerContainer}>
            <View style={styles.marker}>
              <Ionicons name="person" size={16} color="white" />
            </View>
          </View>
        </Marker>
      );
    }).filter(Boolean); 
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#07575B" />
        <Text style={styles.loadingText}>Loading Map...</Text>
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
    <View style={styles.container}>
      <StatusBar backgroundColor="#07575B" barStyle="light-content" />

     

     
      

      {/* Map */}
      {region && (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {renderMarkers()}
        </MapView>
      )}

      {/* Selected Location Info */}
      {selectedLocation && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoName}>{selectedLocation.name}</Text>
          <Text style={styles.infoAddress}>{selectedLocation.address}</Text>
        </View>
      )}

      {/* Student List Button */}
      <TouchableOpacity
        style={styles.listButton}
        onPress={() => {
          alert(`Total students: ${students.length}`);
        }}
      >
        <Ionicons name="list" size={24} color="white" />
        <Text style={styles.listButtonText}>Students ({students.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#07575B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 40,
  },
  searchContainer: {
    position: 'absolute',
    top: 110,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
   
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
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 8,
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
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: '#07575B',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  infoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  infoAddress: {
    fontSize: 14,
    color: '#666',
  },
  listButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#07575B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
  },
  listButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
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

export default MapViewScreen;