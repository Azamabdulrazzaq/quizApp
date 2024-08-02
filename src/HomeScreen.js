import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import reactImage from './images/reactjs.png'
import htmlImage from './images/html.png'
import cssImage from './images/css.png'
import javaImage from './images/javascript.png'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'

const HomeScreen = ({ navigation }) => {
    //States:
    const [title, setTitle] = useState([])

    useEffect(() => {
        console.log("its working")
        fetchApi();
    }, [])

    const fetchApi = async () => {
        try {
            const result = await axios.get("http://192.168.100.8:8080/quiz/get/categoryShow")
            setTitle(result.data.data)
            console.log(result.data.data)
        }

        catch (error) {
            console.log(error)
        }
    }

    const getCatagoryImages = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case "react":
                return reactImage;
            case 'html':
                return htmlImage;
            case 'css':
                return cssImage;
            case "javascript":
                return javaImage;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.header}>WELLCOME TO </Text>
                <Text style={styles.name}>QUIZ</Text>
            </View>
            <View>
                <Text style={{ textAlign: "center", fontSize: 30, color: "#fff" }}>Select topic below to start your Quiz</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBtn}>
                    {title.map((item, index) => (
                        // <Text key={caterory._id}>{caterory.category_name}</Text>
                        <View style={styles.section1} key={item._id}>
                            <TouchableOpacity style={styles.btn} activeOpacity={0.5}
                                onPress={() => {
                                    navigation.navigate("QuestionDetails", { item })
                                }}
                            >
                                <Image
                                    style={{ width: 60, height: 50 }}
                                    source={getCatagoryImages(item.category_name)}
                                    width={10}
                                    height={10}
                                />
                                <Text style={styles.BtnStyle}>{item.category_name}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

        </View >
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#5e5e5c"
    },
    titleBtn: {
        display: "flex",
        flexDirection: "column"
    },
    header: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold"
    },
    name: {
        fontWeight: "bold",
        color: "#C000C0",
        fontSize: 40,
    },
    section: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
    },

    section1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 15
    },

    quizBtn: {
        width: 180,
        backgroundColor: "rgba(0,0,0,)",
        height: 40,
        margin: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#fff",
        borderRadius: 20
    },

    btn: {
        width: "40%",
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: "#fff",
        height: 100,
        borderWidth: 1,
        margin: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    BtnStyle: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff",
    },
    BtnStyle1: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    btn1: {
        width: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25
    },
    BtnText: {
        color: "#fff",
        fontSize: 30,
    },

})