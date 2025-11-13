import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  ActivityIndicator
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { login } from './modal';
const { height, width } = Dimensions.get('window');

const COLORS = {
  white: '#FFFFFF',
  dark: '#042026',
  teal: '#003B46',
  ocean: '#07575B',
  sky: '#66A5AD',
};

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);
    login.username = username;
    login.password = password;

    try {
      const response = await fetch(`https://https-githubcom-shobhannetha-taskbackend-production-8aed.up.railway.app/api/Login/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.error || data.message || 'Login failed. Please try again.');

      } else {
        navigation.navigate('AddStudent');
      }
    } catch (error) {
      setLoading(false);
      console.error('Login Error:', error);
      setError('Network error. Please try again later.');
    }
  }
  const validateForm = () => {
    if (!username.trim()) {
      setError('Username is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#07575B", height: StatusBar.currentHeight }}>
        <StatusBar barStyle="dark-content" backgroundColor="#07575B" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Illustration */}
          <View style={styles.header}>
            <View style={styles.illustrationContainer}>
              <Image
                source={require('../assets/Group 1433.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.title}>SIGN IN</Text>

            {/* Username Input */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="User Name"
                maxLength={30}
                placeholderTextColor="#777"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#777"
                value={password}
                maxLength={30}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >

                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
            </TouchableOpacity>
            {error ? <Text style={{ color: 'red', top: -15 }}>{error}</Text> : null}
            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (

                <Text style={styles.loginButtonText}>LOG IN</Text>
              )}
            </TouchableOpacity>

            {/* Sign Up Link */}

          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}> SignUp</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    // flex: 1,

  },
  header: {
    alignItems: 'center',

    marginTop: -3,

  },
  illustrationContainer: {
    width: width * 0.99,
    height: height * 0.35,

    alignItems: 'center',

  },
  illustration: {
    width: width * 0.99,
    height: height * 0.4,
  },
  card: {
    backgroundColor: COLORS.sky,
    borderRadius: 10,
    padding: 25,
    marginHorizontal: 10,
    marginTop: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
    flex: 1,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.teal,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginVertical: 15,
    marginTop: -10,

  },
  forgotPasswordText: {
    color: COLORS.ocean,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: COLORS.teal,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: COLORS.teal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  signupText: {
    color: COLORS.dark,
    fontSize: 14,
  },
  signupLink: {
    color: COLORS.ocean,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LoginScreen;