import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState } from 'react'
import titleImage from './images/quiztimetitle.png'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
const QuestionDetails = ({ route, navigation }) => {
    const { item } = route.params;
    //states:
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0)
    const [time, setTime] = useState(0)
    const [errorShow, setErrorShow] = useState(null);
    const [loading, setLoading] = useState(true)

    // axios api:
    const fetchData = async () => {
        try {
            const result = await axios.post("http://192.168.100.8:8080/quiz/category-related-questions", {
                category_id: item._id
            })
            console.log(result.data)
            const fetchQuestion = result.data.data
            setQuestions(fetchQuestion)
            calculateTotalMarks(fetchQuestion)
            setLoading(false)
        }
        catch (error) {
            console.log("Error Shown :", error)
            setErrorShow("Failed to load quiz data.")
            setLoading(false)
        }
    }

    const currentTime = () => {
        const totalSeconds = 60 * 10;
        const totalMinuts = totalSeconds / 60;
        setTime(totalMinuts)
    }

    const calculateTotalMarks = (question) => {
        const total = question
            .map((question) => {
                return Number(question.question_marks)
            })

        const finalTotal = total.reduce((sum, num) => sum + num, 0)
        setScore(finalTotal)
    }



    useEffect(() => {
        fetchData();
        currentTime();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#00ff00" style={styles.loading} />
    }

    if (errorShow) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{errorShow}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Image
                    style={styles.Image}
                    source={titleImage}
                />
            </View>
            <Text style={styles.Heading}>QUIZ DETAILS</Text>
            <View style={styles.section1}>
                <Text style={styles.text}>Selected Quiz Topic<Text style={styles.category}>{item.category_name}</Text></Text>
                <Text style={styles.text}>Total Question Attempt<Text style={styles.question}>{questions.length}</Text></Text>
                <Text style={styles.text}>Score in Total<Text style={styles.scores}>{score}</Text></Text>
                <Text style={styles.text}>Total Time<Text style={styles.time}>{time}</Text></Text>
            </View>
            <View style={styles.footer}>
                <LinearGradient colors={["#8A2387", "#E94057", "#F27121", "#333399"]} style={{ borderRadius: 30 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <TouchableOpacity style={styles.btn}
                        onPress={() => {
                            navigation.navigate("QuestionScreen", {
                                item,
                                questions,
                                score,
                                time
                            })
                        }}
                    >
                        <Text style={styles.btntext}>START</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    )
}

export default QuestionDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#241A1A"
    },
    section: {
        flex: 1.8,
        backgroundColor: "blue",
        width: "100%",
        height: "35%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Image: {
        width: "100%",
        height: "100%"
    },
    Heading: {
        color: "#fff",
        textAlign: "center",
        fontSize: 50
    },

    text: {
        color: "#fff",
        fontSize: 30
    },
    section1: {
        flex: 1.1,
        width: "100%",
        margin: 20,
    },
    btntext: {
        color: "#fff",
    },
    footer: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        width: 210,
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },

    btntext: {
        fontSize: 50,
        color: "#fff",
        fontWeight: "bold"
    },
    error: {
        color: "#ff0000",
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    category: {
        color: "red",
    },
    question: {
        color: "red"
    },
    scores: {
        color: "red"

    },
    time: {
        color: "red"
    },
})