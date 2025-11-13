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
import { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Dimensions } from 'react-native';
import { studentDetails } from './modal';
const { width, height } = Dimensions.get('window');
const AddStudentDetails = () => {
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
    const formatted = date.toLocaleDateString('en-GB'); // DD/MM/YYYY
    setDob(formatted);
    hideDatePicker();
  };
  const [errorMessage, setErrorMessage] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // Dropdowns
  const [classVisible, setClassVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [bloodGroupVisible, setBloodGroupVisible] = useState(false);

  const classOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sectionOptions = ['A', 'B', 'C', 'D', 'E', 'F'];
  const BloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];



  // Add this useEffect to debug your form state
  React.useEffect(() => {
    console.log('=== CURRENT FORM STATE ===');
    console.log('Name:', name);
    console.log('Class:', studentClass);
    console.log('Section:', section);
    console.log('Blood Group:', bloodGroup);
    console.log('Gender:', gender);
    console.log('DOB:', dob);
    console.log('School Name:', schoolName);
    console.log('Father Name:', fatherName);
    console.log('Mother Name:', motherName);
    console.log('Parent Contact:', parentContact);
    console.log('Address:', address1);
    console.log('City:', city);
    console.log('State:', state);
    console.log('ZIP:', zip);
    console.log('Emergency Contact:', emergencyContactNumber);
  }, [name, studentClass, section, bloodGroup, gender, dob, schoolName, fatherName, motherName, parentContact, address1, city, state, zip, emergencyContactNumber]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const formData = new FormData();

      // Append all text fields with actual values
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

      // FIXED: Proper web image handling
      if (studentImage) {
        console.log('Processing image for web:', studentImage);

        if (studentImage.startsWith('blob:')) {
          try {
            // Convert blob URI to actual File object for web
            const response = await fetch(studentImage);
            const blob = await response.blob();

            // Create a proper File object (this is key for web)
            const file = new File([blob], `student_${Date.now()}.jpg`, {
              type: 'image/jpeg'
            });

            // Append the File object directly (not as an object)
            formData.append('studentImage', file);
            console.log('Successfully created File object:', file);
          } catch (blobError) {
            console.error('Error converting blob:', blobError);
            alert('Error processing image. Please try again.');
            setIsLoading(false);
            return;
          }
        } else {
          // For non-blob URIs (shouldn't happen in web)
          formData.append('studentImage', studentImage);
        }
      }

      // Debug FormData
      console.log('=== FormData Contents ===');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const response = await fetch(`http://localhost:5000/api/students/add`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        setShowSuccessModal(true);
        console.log('Server Response:', data);
      } else {
        console.log('Server Error Response:', data);
        alert(data.error || data.message || 'Error adding student');
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

        // In web, blob URIs are NORMAL and EXPECTED
        // Don't reject them - they work fine with FormData
        setStudentImage(selectedImage);
        setErrorMessage('');

        // Show success message
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
            <> {console.log('daaaa', studentImage)}
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
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
        >
          {isloading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            "Submit"
          )}
        </Button>
        {errorMessage ? <Text style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</Text> : null}
        <TextInput
          label="Student Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />

        {/* Class & Section */}
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
          onChangeText={setSchoolName}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />


        {/* <View style={styles.genderDobRow}> */}

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
          {/* </View> */}



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
          onChangeText={setFatherName}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="Mother's Name"
          value={motherName}
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
          keyboardType="phone-pad"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="Address 1"
          value={address1}
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
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="State"
          value={state}
          onChangeText={setState}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="ZIP Code"
          value={zip}
          onChangeText={setZip}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="Emergency Contact Number"
          value={emergencyContactNumber}
          onChangeText={setEmergencyContactNumber}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />
        <TextInput
          label="Additional Location Info"
          value={addLocation}
          onChangeText={setAddLocation}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#07575B', outline: '#07575B' } }}
        />

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
    // marginTop: 18,
    backgroundColor: '#07575B',
    // marginBottom: '25%',
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
    // alignItems: 'flex-start',
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
    color: "#28a745",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  okButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },


});

export default AddStudentDetails;
