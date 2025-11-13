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
    //   const { studentId } = route.params;
    const studentId = route.params?.studentId ?? 16;

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

            // Make sure this matches your backend route
            const res = await fetch(`http://localhost:5000/getByStudentId/getByStudentId?id=${studentId}`);
            const data = await res.json();
            setStudent(data);
            console.log("dataa", data);
            console.log('shobhan', student)
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
                                    <Image source={{ uri: `http://localhost:5000${student.profile_image_url}` }} style={styles.icon} resizeMode="cover" />
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
                                    <Text style={[styles.sectionTitle, { fontSize: 12, textAlign: 'center' }]}>{student?.dob || 'N/A'}</Text>
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

                                    <View style={styles.leftColumn}>
                                        <Text style={styles.bulletLabel}>Father's name</Text>
                                        <Text style={styles.bulletLabel}>Mother's name</Text>
                                        <Text style={styles.bulletLabel}>Contact no.</Text>
                                        <Text style={styles.bulletLabel}>Emergency contact no.</Text>
                                    </View>


                                    <View style={styles.rightColumn}>
                                        <Text style={styles.parentsNames}>{student?.father_name} {student?.mother_name || 'N/A'}</Text>
                                        <View style={styles.contactsColumn}>
                                            <Text style={styles.contactValue}>{student?.parent_contact || 'N/A'}</Text>
                                            <Text style={styles.contactValue}>{student?.emergency_contact || 'N/A'}</Text>
                                        </View>
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

});

export default Profile;
