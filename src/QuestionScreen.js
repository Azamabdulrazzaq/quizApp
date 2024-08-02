import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import modalImage from "../src/images/times-up.jpg"
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SIZE } from "../src/theme"



const QuestionScreen = ({ route, navigation }) => {
  const { item, questions, score, time } = route.params;

  // const [fillActive, setFillActive] = useState('tab1');
  const [second, setSecond] = useState(time * 60 / 60);
  const [minute, setMinute] = useState(Math.floor(time));
  const question_As_per = 1;
  const [visible, setVisible] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedCurrentOption, setSelectedCurrentOption] = useState(null)
  const [corectAnswer, setCorectAnswer] = useState(null)
  const [isDisabledOptions, setIsDisabledOptions] = useState(false)
  const [scores, setScores] = useState(score)




  const allQuestions = () => {
    const startIndex = currentQuestion * question_As_per
    const endIndex = startIndex + question_As_per
    const result = questions.slice(startIndex, endIndex)
    return result
  }

  const addLeadingZero = (number) => {
    // console.log(number)
    return number > 9 ? number : '0' + number
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    setMinute(minutes)
    const seconds = time % 60;
    setSecond(seconds)
    return `${addLeadingZero(minute)}:${addLeadingZero(second)}`;
  }

  const startTimer = () => {
    let timeRemaining = time * 60; // 10 minutes in seconds
    const interval = setInterval(() => {
      timeRemaining--;

      if (timeRemaining <= 0) {
        clearInterval(interval);
        setVisible(true)
      }
      else {
        formatTime(timeRemaining)
      }
    }, 1000);
  }


  // useEffect(() => {
  //   startTimer()
  // }, [])

  const nextQuestion = () => {
    if ((currentQuestion + 1) < questions.length) {
      const nextQuestion = currentQuestion + 1
      setCurrentQuestion(nextQuestion)
      console.log(nextQuestion)
    }
  }

  const validateAnswer = (selectedAnswer) => {
    const correct_Answer = questions[currentQuestion].is_correct;
    setCorectAnswer(correct_Answer)
    setSelectedCurrentOption(selectedAnswer)
    setIsDisabledOptions(true)

    if (selectedAnswer == correct_Answer) {
      setScores(scores + questions[currentQuestion].question_marks)
    }
    console.log(scores + questions[currentQuestion].question_marks)
  }


  const renderItem = ({ item }) => {
    return (
      <View>
        <View>
          <View style={styles.timerSection}>
            <Text style={styles.QuestionHeading}>{currentQuestion + 1}/{questions.length}</Text>
            <Text style={styles.timeText}>{addLeadingZero(minute)}:{addLeadingZero(second)}</Text>
          </View>
          <Text style={styles.Question}>{item.question}</Text>
        </View>
        <View style={{ justifyContent: "flex-start", alignItems: "flex-start", marginTop: 20 }}>
          {
            item.Option.map((record, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => validateAnswer(record)}
                    style={styles.options}
                  >
                    <Text style={{
                      fontSize: 20,
                      color: COLORS.white
                    }}>{record}</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View>
        <View style={styles.modalBox}>
          <Modal visible={visible} transparent>
            <View style={styles.modalHeader}>
              <View style={styles.modelSection}>
                <View style={styles.buttons}>
                  <Image style={styles.modalImg}
                    source={modalImage}
                  />
                  <LinearGradient colors={["#8A2387", "#E94057", "#F27121", "#333399"]} style={{ borderRadius: 30 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <TouchableOpacity activeOpacity={.8} style={styles.btn}
                      onPress={() => {
                        setVisible(false)
                        navigation.navigate("QuestionProgress")
                      }}
                    >
                      <Text style={styles.btntext}>
                        SCORE SCREEN
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {
          <FlatList
            data={allQuestions()}
            renderItem={renderItem}
          />

        }
        <View style={styles.nextcontainer}>
          <LinearGradient colors={["#8A2387", "#E94057", "#F27121", "#333399"]} style={{ borderRadius: 30 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity activeOpacity={.7} style={styles.btn1}
              onPress={nextQuestion}
            >
              <Text style={styles.btntext1}>{currentQuestion == questions.length - 1 ? "Finish" : "Next"}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View >
  )
}

export default QuestionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 40,
    backgroundColor: COLORS.background,
    position: "relative"
  },
  nextBtn: {
    width: "50%",
    height: "30%",
    backgroundColor: "blue",
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 30
  },
  modalHeader: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  },

  addButton: {
    backgroundColor: "red",
    width: "50%",
    height: 60,
    justifyContent: "center",
    borderRadius: 20,
  },

  addBtn: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },

  modelSection: {
    width: "90%",
    height: "50%",
    backgroundColor: "#0F132C",
    borderRadius: 20,
  },

  timerSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },

  modalText: {
    backgroundColor: "pink",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: 'Cochin',
  },
  modalImg: {
    width: "100%",
    height: "85%",
    borderRadius: 30
  },
  btn: {
    width: 250,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  btntext: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold"
  },
  btn1: {
    width: 210,
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btntext1: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  nextcontainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  QuestionHeading: {
    color: COLORS.white,
    fontSize: 20,
    opacity: 0.6,
  },
  timeText: {
    color: COLORS.white,
    fontSize: 20,
    opacity: 0.6,
  },
  Question: {
    color: COLORS.white,
    fontSize: 30,
    textTransform: "capitalize",
    marginTop: 40
  },
  options: {
    width: 360,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: COLORS.secondary + "20",
    borderColor: COLORS.secondary + "40",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 60,
  },

})



