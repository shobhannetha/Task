import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SignUpScreen = ({ navigation }) => {
    const [form, setForm] = useState({
        username: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    return (
        <View style={styles.container}>
             <View style={{ backgroundColor: "#07575B", height: StatusBar.currentHeight }}>
                           <StatusBar barStyle="dark-content" backgroundColor="#07575B" />
                       </View>  
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* Top Illustration Section */}
                <View style={styles.topSection}>
                    <Image
                        source={require("../assets/Group 1434.png")} // change path to your asset
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Signup Card */}
                <View style={styles.card}>
                    <Text style={styles.title}>SIGN UP</Text>

                    {/* Username */}
                    <TextInput
                        style={styles.input}
                        placeholder="User Name"
                        placeholderTextColor="#777"
                        value={form.username}
                        onChangeText={(t) => setForm({ ...form, username: t })}
                    />

                    {/* Phone */}
                    <TextInput
                        style={styles.input}
                        placeholder="Phone no"
                        placeholderTextColor="#777"
                        keyboardType="phone-pad"
                        value={form.phone}
                        onChangeText={(t) => setForm({ ...form, phone: t })}
                    />

                    {/* Password */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#777"
                        secureTextEntry
                        value={form.password}
                        onChangeText={(t) => setForm({ ...form, password: t })}
                    />

                    {/* Confirm Password */}
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#777"
                        secureTextEntry
                        value={form.confirmPassword}
                        onChangeText={(t) => setForm({ ...form, confirmPassword: t })}
                    />

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.signUpText}>SIGN UP</Text>
                    </TouchableOpacity>

                   
                </View>
                 {/* Sign In Link */}
                    <Text style={styles.footerText}>
                        Already have an account?{" "}
                        <Text
                            style={styles.signInLink}
                            onPress={() => navigation.navigate("Login")}
                        >
                            Signin
                        </Text>
                    </Text>
            </ScrollView>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFF",
       height: height,
    width: width,
    },
    topSection: {
        alignItems: "center",
        marginTop: -5,
        width: width,
        height: height * 0.35,
        borderBottomLeftRadius: 100,
    },
    image: {
        width: width * 0.998,
        height: height * 0.4,
    },
    card: {
        backgroundColor: "#66A5AD",
        width: "95%",
        height: height * 0.54,
        borderRadius: 10,
        padding: 20,
        marginTop: -40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },

        alignSelf: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#07575B",
        marginBottom: 20,

    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#042026",
        fontSize: 16,
        paddingVertical: 8,
        marginBottom: 18,
        color: "#333",
    },
    signUpButton: {
        backgroundColor: "#056666",
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 35,
    },
    signUpText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    footerText: {
        textAlign: "center",
        marginTop: 20,
        color: "#555",
    },
    signInLink: {
        color: "#056666",
        fontWeight: "bold",
    },
});
