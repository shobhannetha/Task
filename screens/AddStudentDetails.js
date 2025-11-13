import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Modal } from 'react-native';
import {
  TextInput,
  Provider as PaperProvider,
  Button,
  Menu,
  Text,
  TouchableRipple,
  RadioButton
} from 'react-native-paper';
import { useState, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Dimensions } from 'react-native';
import { studentDetails } from './modal';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddStudentDetails = ({ navigation, route }) => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [section, setSection] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [addLocation, setAddLocation] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [studentImage, setStudentImage] = useState(null);
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date) => {
    const formatted = date.toLocaleDateString('en-GB');
    setDob(formatted);
    hideDatePicker();
  };
  const [selectedCoordinates, setSelectedCoordinates] = useState(null)
  const [errorMessage, setErrorMessage] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [classVisible, setClassVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [bloodGroupVisible, setBloodGroupVisible] = useState(false);

  const classOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sectionOptions = ['A', 'B', 'C', 'D', 'E', 'F'];
  const BloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];



  // Load form data when component mounts
  React.useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('tempFormData');
      if (savedData) {
        const formData = JSON.parse(savedData);

        // Only restore fields if we're NOT coming from LocationPicker
        // Check if we have fresh location data from navigation
        if (!route.params?.selectedLocation) {
          setName(formData.name || '');
          setStudentClass(formData.studentClass || '');
          setSection(formData.section || '');
          setSchoolName(formData.schoolName || '');
          setFatherName(formData.fatherName || '');
          setMotherName(formData.motherName || '');
          setParentContact(formData.parentContact || '');
          setAddress1(formData.address1 || '');
          setCity(formData.city || '');
          setState(formData.state || '');
          setZip(formData.zip || '');
          setEmergencyContactNumber(formData.emergencyContactNumber || '');
          setGender(formData.gender || '');
          setDob(formData.dob || '');
          setBloodGroup(formData.bloodGroup || '');
          setStudentImage(formData.studentImage || null);
          setAddLocation(formData.addLocation || '');
        } else {
          // We have fresh location data, only restore other fields
          setName(formData.name || '');
          setStudentClass(formData.studentClass || '');
          setSection(formData.section || '');
          setSchoolName(formData.schoolName || '');
          setFatherName(formData.fatherName || '');
          setMotherName(formData.motherName || '');
          setParentContact(formData.parentContact || '');
          setAddress1(formData.address1 || '');
          setCity(formData.city || '');
          setState(formData.state || '');
          setZip(formData.zip || '');
          setEmergencyContactNumber(formData.emergencyContactNumber || '');
          setGender(formData.gender || '');
          setDob(formData.dob || '');
          setBloodGroup(formData.bloodGroup || '');
          setStudentImage(formData.studentImage || null);
          // DON'T set addLocation here - let the location useEffect handle it
        }

        // Clear the temporary storage
        await AsyncStorage.removeItem('tempFormData');
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  };


  const handleLocationPress = async () => {
    try {
      const formData = {
        name,
        studentClass,
        section,
        schoolName,
        fatherName,
        motherName,
        parentContact,
        address1,
        city,
        state,
        zip,
        emergencyContactNumber,
        gender,
        dob,
        bloodGroup,
        studentImage,
        addLocation,
      };

      // ✅ Save the current form before navigation
      await AsyncStorage.setItem('tempFormData', JSON.stringify(formData));

      // ✅ Navigate AFTER data is saved
      navigation.navigate('LocationPicker');
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  useEffect(() => {
    if (route.params?.selectedLocation) {
      const { address, latitude, longitude } = route.params.selectedLocation;
      setAddLocation(address);
      setSelectedCoordinates({ latitude, longitude });

    }
  }, [route.params?.selectedLocation]);

  React.useEffect(() => {


  }, [name, studentClass, section, bloodGroup, gender, dob, schoolName, fatherName, motherName, parentContact, address1, city, state, zip, emergencyContactNumber, addLocation]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('name', name || '');
      formData.append('class', studentClass || '');
      formData.append('section', section || '');
      formData.append('blood_group', bloodGroup || '');
      formData.append('dob', dob || '');
      formData.append('father_name', fatherName || '');
      formData.append('mother_name', motherName || '');
      formData.append('address1', address1 || '');
      formData.append('city', city || '');
      formData.append('state', state || '');
      formData.append('zip_code', zip || '');
      formData.append('emergency_contact', emergencyContactNumber || '');
      formData.append('gender', gender || '');
      formData.append('school_name', schoolName || '');
      formData.append('AddAddress', addLocation || '');
      if (selectedCoordinates) {
        formData.append('location_lat', selectedCoordinates.latitude.toString());
        formData.append('location_lng', selectedCoordinates.longitude.toString());

      } else {
        console.log('No coordinates available');
      }

      // ✅ Handle image upload for both web and mobile
      if (studentImage) {
        console.log('Processing image:', studentImage);

        if (typeof window !== 'undefined' && studentImage.startsWith('blob:')) {
          // Web (browser) case
          try {
            const response = await fetch(studentImage);
            const blob = await response.blob();

            const file = new File([blob], `student_${Date.now()}.jpg`, {
              type: 'image/jpeg',
            });

            formData.append('studentImage', file);
            console.log('Successfully created File object (web):', file);
          } catch (blobError) {
            console.error('Error converting blob:', blobError);
            alert('Error processing image. Please try again.');
            setIsLoading(false);
            return;
          }
        } else {
          // React Native (mobile) case
          const imageName = studentImage.split('/').pop() || `student_${Date.now()}.jpg`;

          formData.append('studentImage', {
            uri: studentImage,
            name: imageName,
            type: 'image/jpeg',
          });

          console.log('Successfully appended image object (mobile)');
        }
      }

      // Debug FormData
      console.log('=== FormData Contents ===');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const response = await fetch(
        `https://https-githubcom-shobhannetha-taskbackend-production-8aed.up.railway.app/api/students/add`, // ✅ use correct Railway domain
        {
          method: 'POST',
          body: formData,
        }
      );

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText); // try to parse JSON
      } catch (err) {
        console.error("Response is not JSON:", responseText.substring(0, 200));
        throw new Error("Server returned an error page. Check backend logs.");
      }

      if (response.ok) {
        setShowSuccessModal(true);
        console.log("Server Response:", data);
      } else {
        console.log("Server Error Response:", data);
        alert(data.error || data.message || `Error: ${response.status}`);
      }

    } catch (error) {
      console.error('Error submitting student:', error);
      alert('Something went wrong: ' + error.message);
      setIsLoading(false);
    }
  };




  const validateForm = () => {
    if (!studentImage) {
      setErrorMessage("Student Image is required.");
      return false;
    }
    if (!name) {
      setErrorMessage("Student Name is required.");
      return false;
    }
    setErrorMessage('');
    return true;
  }


  const handleImageUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0].uri;

        console.log('Selected image URI (web):', selectedImage);
        setStudentImage(selectedImage);
        setErrorMessage('');
        console.log('Image selected successfully');
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Error uploading image");
    }
  };



  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.topButton} onPress={handleImageUpload}>
          {studentImage ? (
            <Image source={{ uri: studentImage }} style={styles.uploadedImage} />

          ) : (
            <>
              <Image source={require('../assets/Group 1379.png')} style={styles.icon} />
              <Image
                source={require('../assets/interface (6).png')}
                style={[styles.label, {
                  marginTop: 60,
                  fontSize: 16,
                  marginLeft: -15
                }]}
                resizeMode="contain"
              />
            </>
          )}
        </TouchableOpacity>


        <TextInput
          label="Student Name"
          value={name}
          maxLength={30}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />


        <View style={styles.rowContainer}>
          <View style={styles.dropdownHalf}>
            <Menu
              visible={classVisible}
              onDismiss={() => setClassVisible(false)}
              anchor={
                <TouchableRipple onPress={() => setClassVisible(true)}>
                  <View pointerEvents="none">
                    <TextInput
                      label="Class"
                      value={studentClass}
                      mode="outlined"
                      style={styles.input}
                      theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
                      editable={false}
                      right={<TextInput.Icon icon="menu-down" />}
                    />
                  </View>
                </TouchableRipple>
              }
            >
              {classOptions.map((option, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setStudentClass(option);
                    setClassVisible(false);

                  }}
                  style={{ backgroundColor: '#E0F7FA' }}
                  title={option}
                />

              ))}
            </Menu>
          </View>

          <View style={styles.dropdownHalf}>
            <Menu
              visible={sectionVisible}
              onDismiss={() => setSectionVisible(false)}
              anchor={
                <TouchableRipple onPress={() => setSectionVisible(true)}>
                  <View pointerEvents="none">
                    <TextInput
                      label="Section"
                      value={section}
                      mode="outlined"
                      style={styles.input}
                      theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
                      editable={false}
                      right={<TextInput.Icon icon="menu-down" />}
                    />
                  </View>
                </TouchableRipple>
              }
            >
              {sectionOptions.map((option, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setSection(option);
                    setSectionVisible(false);
                  }}
                  title={option}
                  style={{ backgroundColor: '#E0F7FA' }}

                />
              ))}
            </Menu>
          </View>
        </View>

        <TextInput
          label="School Name"
          value={schoolName}
          maxLength={50}
          onChangeText={setSchoolName}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />




        <View style={styles.genderContainer}>
          <Text style={styles.genderLabel}>Gender :</Text>
          <View style={styles.radioRow}>
            <View style={styles.radioItem}>
              <RadioButton
                value="Male"
                status={gender === 'Male' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Male')}
                theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
              />
              <Text style={styles.radioText}>Male</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                value="Female"
                status={gender === 'Female' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Female')}
                theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
              />
              <Text style={styles.radioText}>Female</Text>
            </View>
          </View>




        </View>
        <View style={[styles.dobContainer, { marginBottom: 8 }]} theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}>
          <Text style={[styles.label, { width: 100, marginBottom: -10 }]}>DOB</Text>
          <TouchableOpacity style={styles.inputBox} onPress={showDatePicker}>
            <Text style={styles.inputText}>
              {dob ? dob : '--/--/----'}

            </Text>
            <Image
              source={require('../assets/calendar.png')}
              style={styles.iconImage}

              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
        />


        <View style={[styles.dropdownHalf, { width: '100%' }]}>
          <Menu
            visible={bloodGroupVisible}
            onDismiss={() => setBloodGroupVisible(false)}
            anchor={
              <TouchableRipple onPress={() => setBloodGroupVisible(true)}>
                <View pointerEvents="none">
                  <TextInput
                    label="Blood Group"
                    value={bloodGroup}
                    mode="outlined"
                    style={styles.input}
                    theme={{ colors: { primary: '#07575B', outline: '#07575B', placeholder: '#07575B', } }}
                    editable={false}
                    right={<TextInput.Icon icon="menu-down" />}
                  />
                </View>
              </TouchableRipple>
            }
          >
            {BloodGroupOptions.map((option, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setBloodGroup(option);
                  setBloodGroupVisible(false);

                }}
                style={{ backgroundColor: '#E0F7FA' }}
                title={option}
              />

            ))}
          </Menu>
        </View>
        <TextInput
          label="Father's Name"
          value={fatherName}
          maxLength={30}
          onChangeText={setFatherName}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="Mother's Name"
          value={motherName}
          maxLength={30}
          onChangeText={setMotherName}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="Parent's Contact No"
          value={parentContact}
          onChangeText={setParentContact}
          mode="outlined"
          maxLength={10}
          keyboardType="phone-pad"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="Address 1"
          value={address1}
          maxLength={50}
          onChangeText={setAddress1}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="City"
          value={city}
          onChangeText={setCity}
          mode="outlined"
          maxLength={50}
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="State"
          value={state}
          onChangeText={setState}
          mode="outlined"
          maxLength={30}
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="ZIP Code"
          value={zip}
          onChangeText={setZip}
          mode="outlined"
          maxLength={6}
          keyboardType="numeric"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="Emergency Contact Number"
          value={emergencyContactNumber}
          onChangeText={setEmergencyContactNumber}
          mode="outlined"
          maxLength={10}
          keyboardType="phone-pad"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TouchableOpacity onPress={handleLocationPress} activeOpacity={0.8}>
          <TextInput
            key={`location-${addLocation}`}
            label="Add Location"
            value={addLocation || ''}
            editable={false}
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
            left={
              <TextInput.Icon
                icon={() => (
                  <Image
                    source={require('../assets/Group 1437.png')}
                    style={styles.locationIcon}
                    resizeMode="contain"
                  />
                )}
              />
            }
            right={
              !addLocation ? (
                <TextInput.Icon
                  icon={() => (
                    <Text style={styles.clickHereText}>Click here to add the location</Text>
                  )}
                />
              ) : null
            }
          />
        </TouchableOpacity>


        {errorMessage ? <Text style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</Text> : null}
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={[styles.button, isloading && styles.buttonDisabled]}
          disabled={isloading}
          contentStyle={styles.buttonContent}
        >
          {isloading ? (
            <View style={styles.buttonLoader}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.buttonLoaderText}>Submitting...</Text>
            </View>
          ) : (
            "Submit"
          )}
        </Button>

        <Modal
          transparent={true}
          visible={showSuccessModal}
          animationType="slide"
          onRequestClose={() => setShowSuccessModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Success!</Text>
              <Text style={styles.modalMessage}>
                Your data has been saved successfully.
              </Text>

              <TouchableOpacity
                style={styles.okButton}
                onPress={() => {
                  setShowSuccessModal(false);
                  navigation.navigate('AddStudent');
                }}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
    height: height,
    width: width,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderColor: '#07575B'

  },
  button: {
    marginTop: 18,
    backgroundColor: '#07575B',
    marginBottom: '25%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  dropdownHalf: {
    width: '48%',
  },
  genderDobRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  genderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',

  },
  genderLabel: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: 4,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,

  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 45,
  },
  radioText: {
    fontSize: 14,
  },
  dobContainer: {
    width: '100%',
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 56,
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  iconImage: {
    width: 22,
    height: 22,
  },
  topButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  label: {
    width: 18,
    height: 30,

  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#07575B",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: "#07575B",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  okButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  locationIcon: {
    width: 40,
    height: 35,
    tintColor: '#07575B',
  },
  clickHereText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },



});

export default AddStudentDetails;
