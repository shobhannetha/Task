import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const COLORS = {
  white: '#FFFFFF',
  dark: '#042026',
  teal: '#003B46',
  ocean: '#07575B',
  sky: '#66A5AD',
  lightBg: '#F0F7F8',
};

const AddStudent = ({ navigation }) => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const handleLogout = () => {
    setLogoutVisible(false);
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.teal} barStyle="light-content" />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>

          {/* Top Section with Image and Title */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/Intersection 4.png')}
              style={styles.image}
              resizeMode="contain"
            />

            {/* Left top icon */}
            <TouchableOpacity style={{ position: 'absolute', top: 55, left: 20 }} onPress={() => navigation.navigate('Profile')}>
              <Image
                source={require('../assets/multimedia.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Right top logout icon */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 55,
                right: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setLogoutVisible(true)}
            >
              <AntDesign name="logout" size={24} color="white" />
            </TouchableOpacity>

            {/* Header text */}
            <View style={styles.header}>
              <Text style={[styles.headerTitle, { fontSize: 14 }]}>Welcome to</Text>
              <Text style={styles.headerTitle}>Student Database App</Text>
            </View>
          </View>

          {/* Content Cards */}
          <View style={styles.content}>
            {/* Add Student Card */}
            <TouchableOpacity
              style={[styles.card, styles.addStudentCard]}
              onPress={() => navigation.navigate('AddStudentDetails')}
            >
              <View style={[styles.cardIcon, { backgroundColor: COLORS.ocean }]}>
                <Image
                  source={require('../assets/Group 1435.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.cardLeft}>
                <Text style={styles.cardTitle}>Add Student</Text>
              </View>
            </TouchableOpacity>

            {/* View Student Card */}
            <TouchableOpacity
              style={[styles.card, styles.viewStudentCard]}
              onPress={() => navigation.navigate('ViewData')}
            >
              <View style={[styles.cardIcon, { backgroundColor: COLORS.ocean }]}>
                <Image
                  source={require('../assets/arrows (2).png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.cardLeft}>
                <Text style={styles.cardTitle}>View Students</Text>
              </View>
            </TouchableOpacity>

            {/* Map View Card */}
            <TouchableOpacity
              style={[styles.card, styles.mapViewCard]}
              onPress={() => navigation.navigate('MapView')}
            >
              <View style={[styles.cardIcon, { backgroundColor: COLORS.ocean }]}>
                <Image
                  source={require('../assets/Group 1437.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.cardLeft}>
                <Text style={styles.cardTitle}>Map View</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Bottom Decorative Image */}
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Image
              source={require('../assets/Group 247.png')}
              style={{
                width: width * 0.9,
                height: height * 0.2,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </View>

          <Modal
            visible={logoutVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setLogoutVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Are you sure you want to logout?</Text>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: COLORS.ocean }]}
                    onPress={handleLogout}
                  >
                    <Text style={styles.modalButtonText}>Yes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                    onPress={() => setLogoutVisible(false)}
                  >
                    <Text style={[styles.modalButtonText, { color: COLORS.dark }]}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    height: height,
    width: width,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.35,
    alignItems: 'center',
    borderBottomLeftRadius: 100,
  },
  image: {
    width: width * 0.998,
    height: height * 0.4,
  },
  header: {
    justifyContent: 'center',
    marginTop: '-65%',
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  content: {
    padding: 20,
    marginTop: -40,
    gap: 20,
    width: '40%',
    height: '28%',
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#cde4f1ff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  cardLeft: {},
  cardTitle: {
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
    color: COLORS.dark,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.ocean,
    marginTop: 3,
  },
  cardIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconImage: {
    width: 50,
    height: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  modalButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 15,
  },
});

export default AddStudent;