import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native'
import Backimage from "../images/background4.png";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Diamond from "../../src/images/dimond.png"
import * as yup from "yup";
import { Formik } from 'formik';
import {showMessage, hideMessage} from 'react-native-flash-message'

const loginValidationSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: yup.string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required')
        .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
        ),
})

const Login = () => {

    const navigation = useNavigation();

    //  Login Success Message
        const successShowMsg = () => {
            showMessage({
                message: 'Success',
                description: 'Congratulations, Your Are Successfully Login',
                type: 'success',
                icon: 'success',
            });
        };

      const saveUser = async(result) => {
         try {
        await AsyncStorage.setItem('usertoken',JSON.stringify(result.data.data))
        await AsyncStorage.setItem('isLoggedInSuccess', JSON.stringify(true) )
            
         } catch (error) {
            console.log("Show Error", error)
         }   
        }

    const handleLogin = async (formData) => {



        const { email, password } = formData;
        try {
            const result = await axios.post("http://192.168.100.8:8080/quiz/login", {
                email: email,
                password: password
            })
            console.log(result.data.data)
            console.log('Login result:', result.data);
            if (result.data.status) {
               saveUser(result)
               successShowMsg()
                navigation.navigate("HomeScreen")
            }

        }
        catch (error) {
            console.log("Error", error)
        }
    }

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validateOnMount={true}
            onSubmit={values => console.log(values)}
            validationSchema={loginValidationSchema}
        >
            {({ handleChange, handleSubmit, values, touched, errors, isValid, setFieldTouched }) => (
                <View style={styles.container}>
                    <ImageBackground source={Backimage} style={styles.back}>
                        <ScrollView keyboardShouldPersistTaps={"always"}>
                            <View style={styles.headerContainer}>
                                <Image
                                    style={styles.headerImg}
                                    source={Diamond}
                                    resizeMode={"cover"}
                                />
                            </View>
                            <Text style={styles.header}>Login</Text>
                            <View style={styles.innerSection}>
                                <Text style={styles.emailName}>Email</Text>
                                <TextInput style={styles.email}
                                    placeholder='Enter Your Email'
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                    value={values.email}
                                    placeholderTextColor={"#ccc"}
                                />
                                {errors.email && touched.email &&
                                    <Text style={styles.errors}>{errors.email}</Text>
                                }
                                <Text style={styles.passwordName}>Password</Text>
                                <TextInput style={styles.password}
                                    placeholder='Enter Your password'
                                    onChangeText={handleChange('password')}
                                    onBlur={() => setFieldTouched("password")}
                                    value={values.password}
                                    secureTextEntry={true}
                                    placeholderTextColor={"#ccc"}
                                />
                                {touched.password && errors.password &&
                                    <Text style={styles.errors}>{errors.password}</Text>
                                }
                                <TouchableOpacity style={styles.forgetBtn}>
                                    <Text style={styles.forget}>Forget password?</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn}
                                    onPress={() => handleLogin(values)}
                                >
                                    <Text style={styles.btnLogin}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.footer}>
                                <Text style={styles.textArea}>Don't have an account? </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("SignUp")
                                    }}
                                >
                                    <Text style={styles.btnSignUp}>SignUp</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            )}
        </Formik>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        width: "100%",
    },
    headerImg: {
        width: 270,
        height: 180,
        display: "flex",
        justifyContent: "center",
        alignSelf: "center"
    },
    innerSection: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },

    emailName: {
        marginRight: "65%",
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
    },
    passwordName: {
        marginRight: "55%",
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
    },
    email: {
        width: "85%",
        backgroundColor: "rgba(0,0,0,0)",
        borderStyle: "solid",
        borderBottomColor: "#fff",
        marginBottom: 5,
        padding: 10,
        fontSize: 25,
        color: "#fff",
    },

    password: {
        width: "85%",
        backgroundColor: "rgba(0,0,0,0)",
        padding: 10,
        fontSize: 25,
        color: "#fff",
    },
    btn: {
        width: "85%",
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#FC2569",
        backgroundColor: "#FC2569"
    },

    btnLogin: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 25,
        padding: 20,
    },
    text: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
    },
    text1: {
        color: "#fff",
    },
    text2: {
        fontSize: 20,
        color: "#fff",
        marginLeft: 10,
        marginRight: 10,
    },
    text3: {
        color: "#fff",
    },
    otherItems: {
        display: "flex",
        flexDirection: "row",
        margin: 10,
    },
    item1: {
        fontSize: 20,
    },
    item2: {
        fontSize: 20,
    },
    item3: {
        fontSize: 20,
    },
    btn1: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        margin: 20,
    },
    header: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 10,
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 120,
    },
    btnSignUp: {
        color: "#FC2569",
        fontWeight: "bold",
        fontSize: 20,
    },
    textArea: {
        color: "#fff",
        fontSize: 20,
    },
    forget: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    forgetBtn: {
        marginTop: 10,
        marginBottom: 15,
        marginRight: -170,
    },
    back: {
        flex: 1,
    },
    errors: {
        fontSize: 20,
        color: "red",
        fontWeight: "bold",
        marginTop: 7
    }
});



 //Login Success Message
        // const successShowMsg = () => {
        //     showMessage({
        //         message: 'Success',
        //         description: 'Congratulations, Your Are Successfully Login',
        //         type: 'success',
        //         icon: 'success',
        //     });
        // };

        // const saveUser = () => {
            
        // }

