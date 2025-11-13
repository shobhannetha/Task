import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [student, setStudent] = useState(null);
    const route = useRoute();
    const [imageError, setImageError] = useState(false);
    //   const { studentId } = route.params;
    const studentId = route.params?.studentId ?? 16;
    useEffect(() => {
        if (student && student.profile_image_url) {
            const fullImageUrl = `https://https-githubcom-shobhannetha-taskbackend-production-8aed.up.railway.app${student.profile_image_url}`;
            console.log('Full Image URL:', fullImageUrl);
            console.log('Profile Image Path:', student.profile_image_url);
        }
    }, [student]);
    const handleImageError = (error) => {
        console.log('Image loading failed:', error.nativeEvent.error);
        setImageError(true);
    };

    const handleImageLoad = () => {
        console.log('Image loaded successfully');
        setImageError(false);
    };

    useEffect(() => {
        response();
    }, []);
    useEffect(() => {
        console.log(student)

    }, [student])

    console.log('dataa', student)
    const response = async () => {
        try {
            setIsLoading(true);

            const res = await fetch(
                `https://https-githubcom-shobhannetha-taskbackend-production-8aed.up.railway.app/getByStudentId/getByStudentId?id=${studentId}`
            );

            const responseText = await res.text(); // get raw text
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (err) {
                console.error("Response is not JSON:", responseText.substring(0, 200));
                throw new Error("Server returned an error page. Check backend logs.");
            }

            setStudent(data);
            console.log("dataa", data);
        } catch (err) {
            console.error("Error fetching student:", err);
        } finally {
            setIsLoading(false);
        }
    };





    return (
        <PaperProvider>
            {isLoading ? (
                <ActivityIndicator />
            ) :
                <>

                    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                        {/* Header Section */}
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.topButton}>
                                {student && student.profile_image_url ? (
                                    // <Image source={{ uri: `https://https-githubcom-shobhannetha-taskbackend-production-8aed.up.railway.app${student.profile_image_url}` }} style={styles.icon} resizeMode="cover" />
                                    <Image
                                        source={{
                                            uri: `https://https-githubcom-shobhannetha-taskbackend-production-8aed.up.railway.app${student.profile_image_url}?t=${Date.now()}`
                                        }}
                                        style={styles.profileImage}
                                        resizeMode="cover"
                                        onError={handleImageError}
                                        onLoad={handleImageLoad}
                                    />
                                ) : (
                                    <Image source={require('../assets/Group 1379.png')} style={styles.icon} resizeMode="contain" />
                                )}
                            </TouchableOpacity>
                            <Text style={styles.name}>{student?.name || 'N/A'}</Text>
                            <Text style={styles.classInfo}>
                                {student?.studentClass} Standard '{student?.section || 'N/A'}' Section
                            </Text>
                            <Text style={styles.schoolName}>{student?.school_name || 'N/A'}</Text>
                        </View>

                        {/* Personal Details Section */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                            <View style={[styles.section, { flex: 1, marginLeft: 10 }]}>
                                <Text style={[styles.sectionTitle, { fontWeight: 'bold', textAlign: 'center' }]}>Gender</Text>
                                <Text style={[styles.sectionTitle, { fontSize: 12, textAlign: 'center' }]}>{student?.gender || 'N/A'}</Text>
                            </View>

                            <View style={[styles.section, { flex: 1, marginLeft: 10 }]}>
                                <View style={[styles.detailRow, { flexDirection: 'column', alignItems: 'center' }]}>
                                    <Text style={[styles.sectionTitle, { fontWeight: 'bold', textAlign: 'center' }]}>DOB</Text>
                                    {/* <Text style={[styles.sectionTitle, { fontSize: 12, textAlign: 'center' }]}>{student?.dob || 'N/A'}</Text> */}
                                    <Text style={[styles.sectionTitle, { fontSize: 12, textAlign: 'center' }]}>
                                        {student?.createdDate ? new Date(student.dob).toISOString().split('T')[0] : 'N/A'}
                                    </Text>
                                </View>
                            </View>

                            <View style={[styles.section, { flex: 1, marginLeft: 10 }]}>
                                <View style={[styles.detailRow, { flexDirection: 'column', alignItems: 'center' }]}>
                                    <Text style={[styles.sectionTitle, { fontWeight: 'bold', textAlign: 'center' }]}>Blood</Text>
                                    <Text style={[styles.sectionTitle, { fontSize: 12, textAlign: 'center' }]}>{student?.blood_group || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>

                        {/* White Background Container */}
                       <View style={styles.whiteContainer}>
    <View style={[styles.section, styles.borderedSection]}>
        <Text style={styles.sectionTitle}>Parents Details</Text>

        <View style={styles.twoColumnContainer}>
            {/* Left Column - Labels */}
            <View style={styles.leftColumn}>
                <Text style={styles.bulletLabel}>Father's name</Text>
                <Text style={styles.bulletLabel}>Mother's name</Text>
                <Text style={styles.bulletLabel}>Contact no.</Text>
                <Text style={styles.bulletLabel}>Emergency contact no.</Text>
            </View>

            {/* Right Column - Values */}
            <View style={styles.rightColumn}>
                <Text style={styles.parentValue}>{student?.father_name || 'N/A'}</Text>
                <Text style={styles.parentValue}>{student?.mother_name || 'N/A'}</Text>
                <Text style={styles.contactValue}>{student?.parent_contact || 'N/A'}</Text>
                <Text style={styles.contactValue}>{student?.emergency_contact || 'N/A'}</Text>
            </View>
        </View>
    </View>


                            {/* Residential Details Section */}
                            <View style={[styles.section, styles.borderedSection]}>
                                <Text style={styles.sectionTitle}>Residential Details</Text>

                                <View style={styles.twoColumnContainer}>
                                    {/* Left Column - Labels */}
                                    <View style={styles.leftColumn}>
                                        <Text style={styles.bulletLabel}>Address 1</Text>
                                        <Text style={styles.bulletLabel}>Address 2</Text>
                                        <Text style={styles.bulletLabel}>City</Text>
                                        <Text style={styles.bulletLabel}>State</Text>
                                        <Text style={styles.bulletLabel}>Zip</Text>
                                    </View>

                                    {/* Right Column - Values */}
                                    <View style={styles.rightColumn}>
                                        <Text style={styles.addressValue}>{student?.address1 || 'N/A'}</Text>
                                        <Text style={styles.addressValue}>-</Text>
                                        <Text style={styles.addressValue}>{student?.city || 'N/A'}</Text>
                                        <Text style={styles.addressValue}>{student?.state || 'N/A'}</Text>
                                        <Text style={styles.addressValue}>{student?.zip_code || 'N/A'}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Location Footer */}
                            <View style={styles.locationFooter}>
                                <Text style={styles.locationText}>{student?.location_lng || 'N/A'}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </>
            }
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07585B',
        height: height,
        width: width,
    },
    contentContainer: {
        // padding: 16,
    },
    header: {
        padding: 20,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    icon: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#fff',
        marginBottom: 12,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
    },
    classInfo: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 2,
    },
    schoolName: {
        fontSize: 14,
        color: '#FFF',
    },
    section: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,

        color: '#07585B',

    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 6,
    },
    label: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    value: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
    },
    footer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    footerText: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
    },
    whiteContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 40,
        paddingHorizontal: 16,
        marginTop: -20,
    },
    //   section: {
    //     backgroundColor: '#fff',
    //     padding: 16,
    //     borderRadius: 8,
    //     marginBottom: 16,
    //   },
    borderedSection: {
        borderWidth: 1,
        borderColor: '#07585B',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#07585B',
    },
    twoColumnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        flex: 1,
        alignItems: 'flex-end',
    },
    bulletLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    parentsNames: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginBottom: 16,
        textAlign: 'right',
    },
    contactsColumn: {
        alignItems: 'flex-end',
    },
    contactValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginBottom: 8,
        textAlign: 'right',
    },
    addressValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginBottom: 8,
        textAlign: 'right',
    },
    locationFooter: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#07585B',
    },
    locationText: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        paddingBottom: 20,
    },
    header: {
        backgroundColor: '#07575B',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    topButton: {
        alignItems: 'center',
        marginBottom: 15,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'white',
    },
    placeholderContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'white',
    },
    placeholderIcon: {
        width: 40,
        height: 40,
        tintColor: 'white',
    },
    placeholderText: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    classInfo: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    schoolName: {
        fontSize: 14,
        color: 'white',
        opacity: 0.9,
    },

});

export default Profile;
