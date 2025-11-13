import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import MainHome from './screens/MainScreen';
import SignUpScreen from './screens/SignUpScreen';
import AddStudent from './screens/AddStudentScreen';
import AddStudentDetails from './screens/AddStudentDetails';
import ViewDataScreen from './screens/ViewData';
import Profile from './screens/Profile';
import LocationPicker from './screens/LocationPicker';
import MapViewScreen from './screens/MapView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="MainHome"
      >
          <Stack.Screen
          name="MainHome"
          component={MainHome}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AddStudent" 
          component={AddStudent} 
          
          options={{ headerShown: false }} 
        /> 
        <Stack.Screen 
          name="AddStudentDetails" 
          component={AddStudentDetails} 
          
          options={{
            title: 'Add Student Details',
            headerStyle: {
              backgroundColor: '#008080',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen 
          name="ViewData" 
          component={ViewDataScreen} 
          
           options={{
            title: 'View Data',
            headerStyle: {
              backgroundColor: '#008080',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerStyle: {
              backgroundColor: '#07585B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
           <Stack.Screen
          name="LocationPicker"
          component={LocationPicker}
          options={{
            title: 'Add Location',
            headerStyle: {
              backgroundColor: '#07585B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
           <Stack.Screen
          name="MapView"
          component={MapViewScreen}
          options={{
            title: 'Map View',
            headerStyle: {
              backgroundColor: '#07585B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;