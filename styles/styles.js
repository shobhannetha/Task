// src/styles/styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  smallButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
  photoButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  photoButtonText: {
    color: '#666',
    fontSize: 16,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 10,
  },
  mapContainer: {
    height: 300,
    marginVertical: 10,
  },
  map: {
    flex: 1,
    borderRadius: 8,
  },
  fullMap: {
    width: width,
    height: height - 150,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  studentPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  studentDetails: {
    fontSize: 14,
    color: '#666',
  },
  cardBody: {
    marginVertical: 5,
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
  mapButton: {
    backgroundColor: '#34C759',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  studentInfo: {
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
});