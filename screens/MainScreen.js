import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

const MainHome = ({ navigation }) => {
    return (

        <View style={styles.container}>
            <View style={{ backgroundColor: "#07575B", height: StatusBar.currentHeight }}>
                <StatusBar barStyle="dark-content" backgroundColor="#07575B" />
            </View>
            {/* Top Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={require("../assets/Group 1433.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            {/* Text + Buttons */}
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Student</Text>
                <Text style={styles.subtitle}>App...</Text>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.loginText}>LOG IN</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}>
                    Don’t have an account?{" "}
                    <Text
                        style={styles.signUpText}
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        SignUp
                    </Text>
                </Text>


            </View>

        </View>
    );
};

export default MainHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFF",
        height: height,
        width: width,

    },
    imageContainer: {
        alignItems: "center",
        // justifyContent: "center",
        width: width,

        height: height * 0.4,

    },
    image: {
        marginTop: -5,
        width: width * 0.999, // responsive width
        height: height * 0.4, // responsive height
    },
    contentContainer: {
        flex: 1,
        // alignItems: "center",
        marginTop: 30,
        marginLeft: 30,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#004c4c",
    },
    subtitle: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#004c4c",
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: "#056666",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 40,
        marginBottom: 20,
        alignItems: "center",
        width: width * 0.8,
    },
    loginText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        textAlign: "center",
    },
    footerText: {
        color: "#444",
        fontSize: 14,
        // alignItems: "center",
        textAlign: "center",
    },
    signUpText: {
        color: "#056666",
        fontWeight: "bold",
    },
});
