import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView, Alert, Image } from 'react-native'
import Backimage from "../images/background4.png";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Diamond from "../../src/images/dimond.png"
import * as yup from "yup";
import { Formik, Field } from 'formik';
import RadioButton from '../RadioButtons';


const SignUpValidationSchema = yup.object().shape({
    name: yup.string()
        .min(8, ({ min }) => `Must be at least ${min} digits `)
        .max(16, ({ max }) => `as Too long! it Must Be at Least ${max} digits`)
        .required('Name is required'),
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
    confirmPassword: yup.string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required')
        .oneOf([yup.ref("password")], "Password Not Matched")
    ,
    contactNum: yup.string()
        .min(11, ({ min }) => `Must be at least ${min} charactors`)
        .required('Contact Number is required'),
    gender: yup.string()
        .oneOf(['male', 'female'], 'Invalid gender')
        .required('Gender is required'),
    role: yup.string()
        .oneOf(['users', 'admin'], 'Invalid Role')
        .required('Role is required'),
})


const SignUp = () => {

    const navigation = useNavigation();

    // for api fetch from node js
    const handleSignUp = async formData => {
        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            contactNum: formData.contactNum,
            gender: radioVal,
            role: "User",

        }
        if (formData.name || formData.email || formData.password || formData.contactNum || radioVal) {
            axios.post("http://192.168.100.8:8080/quiz/signup", userData)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.status == true) {
                        Alert.alert('User Registered Successfully')
                        navigation.navigate("Login")
                    }
                    else if (res.data.status == false) {
                        Alert.alert(JSON.stringify(res.data))
                    }
                    // else {
                    // }
                })
                .catch((err) => {
                    console.log('Error ocured :', err)

                    if (err.response.data.status != true) {
                        Alert.alert(err.response.data.message)
                    }
                })
        }
        else {
            Alert.alert("Fill all Mandetory Details")
        }
    }


    // Create States
    const [radioVal, setRadioVal] = useState("male");

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                contactNum: "",
                gender: "",
                role: ""
            }}
            onSubmit={values => console.log(values)}
            validationSchema={SignUpValidationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldTouched, setFieldValue, values, touched, errors, isValid }) => (
                <View style={styles.container}>
                    <ImageBackground source={Backimage} style={styles.back}>
                        <ScrollView>
                            <View style={styles.headerContainer}>
                                <Image
                                    style={styles.headerImg}
                                    source={Diamond}
                                    resizeMode={"cover"}
                                />
                            </View>
                            <Text style={styles.header}>Signup</Text>
                            <View style={styles.innerSection}>
                                <Text style={styles.userName}>User Name</Text>
                                <TextInput style={styles.email}
                                    placeholder='Enter Your Name'
                                    onChangeText={handleChange('name')}
                                    onBlur={() => setFieldTouched('name')}
                                    value={values.name}
                                    placeholderTextColor={"#ccc"}
                                />
                                {touched.name && errors.name &&
                                    <Text style={styles.errors}>{errors.name}</Text>
                                }
                                <Text style={styles.emailName}>Email</Text>
                                <TextInput style={styles.password}
                                    placeholder='Enter Your Email'
                                    onChangeText={handleChange("email")}
                                    onBlur={() => setFieldTouched('email')}
                                    value={values.email}
                                    placeholderTextColor={"#ccc"}
                                />
                                {touched.email && errors.email &&
                                    <Text style={styles.errors}>{errors.email}</Text>
                                }
                                <Text style={styles.passwordName}>Password</Text>
                                <TextInput style={styles.password}
                                    placeholder='Enter Your Password'
                                    onChangeText={handleChange('password')}
                                    onBlur={() => setFieldTouched('password')}
                                    value={values.password}
                                    placeholderTextColor={"#ccc"}
                                    secureTextEntry={true}
                                />
                                {touched.password && errors.password &&
                                    <Text style={styles.errors}>{errors.password}</Text>
                                }
                                <Text style={styles.confirmPasswordName}>Confirm Password</Text>
                                <TextInput style={styles.password}
                                    placeholder='Enter Your Confirm Password'
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={() => setFieldTouched('confirmPassword')}
                                    value={values.confirmPassword}
                                    placeholderTextColor={"#ccc"}
                                    secureTextEntry={true}
                                />
                                {touched.confirmPassword && errors.confirmPassword &&
                                    <Text style={styles.errors}>{errors.confirmPassword}</Text>
                                }
                                <Text style={styles.userNum}>UserNumber</Text>
                                <TextInput style={styles.email}
                                    keyboardType={"number-pad"}
                                    placeholder='Enter Your Number'
                                    onChangeText={handleChange('contactNum')}
                                    onBlur={() => setFieldTouched('contactNum')}
                                    value={values.contactNum}
                                    placeholderTextColor={"#ccc"}
                                />
                                {touched.contactNum && errors.contactNum &&
                                    <Text style={styles.errors}>{errors.contactNum}</Text>
                                }
                                <Text style={styles.genderName}>Gender:</Text>
                                <View>
                                    <RadioButton
                                        initialValues={0}
                                        label={"Male"}
                                        value={"male"}
                                        status={radioVal === "male"}
                                        onPress={() => {
                                            setRadioVal("male")
                                            setFieldValue('gender', 'male')
                                        }}
                                    />
                                    <RadioButton
                                        initialValues={0}
                                        label={"Female"}
                                        value={"female"}
                                        status={radioVal === "female"}
                                        onPress={() => {
                                            setRadioVal("female")
                                            setFieldValue('gender', 'female')
                                        }}
                                    />
                                </View>

                                <TouchableOpacity style={styles.btn}
                                    onPress={() => handleSignUp(values)}
                                >
                                    <Text style={styles.btnLogin}>
                                        SignUp
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.footer}>
                                <Text style={styles.textArea}> Already Have an account? </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Login")
                                    }}
                                >
                                    <Text style={styles.btnSignin}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            )}
        </Formik>
    )
}


export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        width: "100%",
    },
    headerImg: {
        width: 180,
        height: 130,
        display: "flex",
        justifyContent: "center",
        alignSelf: "center"
    },
    radioBtn: {
        display: "flex",
        flexDirection: "row",
        height: 15,
        width: "35%",
        marginBottom: 40,
    },
    innerSection: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    userName: {
        marginRight: "65%",
        marginTop: -15,
        fontSize: 23,
        color: "#fff",
        fontWeight: "bold",
    },
    genderName: {
        marginRight: "75%",
        marginTop: -15,
        fontSize: 23,
        color: "#fff",
        fontWeight: "bold",
    },
    userNum: {
        marginRight: "62%",
        marginTop: -15,
        fontSize: 23,
        color: "#fff",
        fontWeight: "bold",
    },
    emailName: {
        marginRight: "80%",
        marginTop: -15,
        fontSize: 23,
        color: "#fff",
        fontWeight: "bold",
    },
    passwordName: {
        marginRight: "70%",
        fontSize: 23,
        color: "#fff",
        fontWeight: "bold",
        marginTop: -15,
    },
    confirmPasswordName: {
        marginRight: "48%",
        fontSize: 23,
        color: "#fff",
        fontWeight: "bold",
        marginTop: -15,
    },
    email: {
        width: "85%",
        backgroundColor: 'rgba(0,0,0,0)',
        borderStyle: "solid",
        borderColor: "#fff",
        marginBottom: 20,
        padding: 10,
        fontSize: 20,
        color: "#fff",
        borderBottomWidth: 1
    },

    password: {
        width: "85%",
        backgroundColor: 'rgba(0,0,0,0)',
        borderStyle: "solid",
        borderColor: "#fff",
        marginBottom: 20,
        padding: 10,
        fontSize: 20,
        color: "#fff",
        borderBottomWidth: 1

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
        fontSize: 35,
        fontWeight: "bold",
        color: "#fff",
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    btnSignin: {
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
        marginTop: -30,
        marginBottom: 15,
        marginRight: -170,
    },
    back: {
        flex: 1,
    },
    errors: {
        color: "red",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 5
    }
});