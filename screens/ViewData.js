import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { studentId } from './modal';
const { width, height } = Dimensions.get('window');






const ViewDataScreen = ({ navigation }) => {
  const [isloading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([])
// const navigation=useNavigation()
  const response = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/getstudents/getstudent");
      const data = await res.json();
      setStudents(data);
      console.log('dataa', data)
      console.log('shobhan', students)

    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    response();
  }, []);
  const handleNext=(item)=>{
    studentId.studentid=item.student_id;
    navigation.navigate('profile')
  }
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `http://localhost:5000${item.profile_image_url}` }}
        style={styles.avatar}
        resizeMode="contain"
      />
      
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>{item.section} / {item.school_name}</Text>
      </View>
      <TouchableOpacity style={styles.arrowButton} onPress={() => {
   
    navigation.navigate('Profile', { studentId: item.student_id }); 
  }}>
    {console.log('datta',studentId)}
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
      {isloading ? (
        <ActivityIndicator  style={{justifyContent:'center',alignItems:'center',position:'static',}}/>
      ) : (

        <FlatList
          data={students}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
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
