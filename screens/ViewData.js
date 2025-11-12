import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const students = [
  { id: '1', name: 'Micahel', grade: '6th Std - A', school: 'K.G School', image: require('../assets/Group 1379.png') },
  { id: '2', name: 'Amitha', grade: '6th Std - A', school: 'K.G School', image: require('../assets/Group 1379.png') },
  { id: '3', name: 'Arul', grade: '6th Std - A', school: 'K.G School', image: require('../assets/Group 1379.png') },
  { id: '4', name: 'Shankar', grade: '6th Std - A', school: 'K.G School', image: require('../assets/Group 1379.png') },
  { id: '5', name: 'Sarath', grade: '6th Std - A', school: 'K.G School', image: require('../assets/Group 1379.png') },
  { id: '6', name: 'Jai', grade: '6th Std - A', school: 'K.G School', image: require('../assets/Group 1379.png') },
];

const ViewDataScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} resizeMode="contain" style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>{item.grade} / {item.school}</Text>
      </View>
      <TouchableOpacity style={styles.arrowButton}>
        <Image
          source={require('../assets/trajectory.png')}
          style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#FFFFF',
    height: height,
    width: width,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e2f1f1ff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    // elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#07585B',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003B46',
  },
  details: {
    fontSize: 14,
    color: '#07575B',
  },
  arrowButton: {
    backgroundColor: '#003B46',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
});

export default ViewDataScreen;
