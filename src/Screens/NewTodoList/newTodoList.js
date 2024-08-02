import { useEffect, useState } from 'react'
import { FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { newAddItem, newDeleteItem, newUpdateItem, toggleTodo } from '../../redux/reducers/user-reducer/user-reducer';
import Icons from 'react-native-vector-icons/Entypo';
import deleteBtn from "../../images/delete.png";
import editBtn from "../../images/edit.png";
import CheckBox from 'react-native-check-box';


const NewTodoList = () => {

    const colorItem = {
        colorDark: "#7A7777",
        colorCheck: "#0AB6AB",
        colorWhite: "white"
    }
    const initialData = [];
    //States..!
    const [listData, setListData] = useState(initialData);
    const [inputVal, setInputVal] = useState("");
    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState("");

    // // Note Redux States...!
    const reduxStates = useSelector(({ userStates }) => { return userStates.newTodoItem })
    console.log("reduxStates", reduxStates);

    // // Note the Function Dispatch is here...!
    const dispatch = useDispatch();



    const updateTodoStatus = (prevousData) => {
        let updatedData = {
            ...prevousData,
            status: !prevousData.status
        }

        updatedData && dispatch(newUpdateItem(updatedData))
    }

    // // Note the function is AddItem...!
    const addItems = () => {

        const time = new Date();
        const currentHours = time.getHours();
        const getHours = currentHours % 12 || 12;
        const currentMinutes = time.getMinutes();
        const currentSeconds = time.getSeconds();
        const AMPM = currentHours >= 12 ? "pm" : "am";
        const curTime = `${getHours}:${currentMinutes}:${currentSeconds}`
        const newItem = {
            value: inputVal,
            currentDate: date,
            curTime
        }

        inputVal.trim().length > 3 && dispatch(newAddItem(newItem))
        setInputVal("");
        setVisible(false)
    }

    const currentDate = () => {
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let currentDate = new Date()
        let dd = currentDate.getDate();
        let month = currentDate.getMonth();
        let mm = monthNames[month];
        let yy = currentDate.getFullYear();
        const fullDate = `${mm} ${dd} ${yy}`
        setDate(fullDate);
    }


    const renderItem = ({ item }) => {
        return (
            <View style={styles.list}>
                <TouchableOpacity activeOpacity={.7}
                    onPress={() => dispatch(newDeleteItem(item.id))}
                >
                    <Image
                        style={styles.delete}
                        source={deleteBtn}
                    />
                </TouchableOpacity>

                <CheckBox
                    onClick={() => updateTodoStatus(item)}
                    isChecked={item.status}
                    leftText={"CheckBox"}
                    checkBoxColor={item.status ? colorItem.colorCheck : colorItem.colorDark}
                />
                <Text style={{ color: item.status ? colorItem.colorWhite : colorItem.colorDark, fontSize: 20, marginRight: 70 }}>{item.text}</Text>
                <Text style={{ color: item.status ? colorItem.colorWhite : colorItem.colorDark , fontSize : 15 }}>{item.date}</Text>
            </View>
        )
    }

    useEffect(() => {
        currentDate();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.headerSection}>
                    <Icons
                        style={styles.backicon}
                        name="chevron-left"
                        size={25}
                        color="black"
                    />
                    <Text style={styles.header}>TodoList</Text>
                    <Icons
                        style={styles.dotes}
                        name="dots-three-vertical"
                        size={25}
                        color="black"
                    />
                </View>
                <View style={styles.middleSection}>
                    <Text style={styles.heading}>Today</Text>
                    <Text style={styles.heading1}>{date}</Text>
                    {
                        (reduxStates.length > 0)
                            ?
                            (
                                <FlatList
                                    data={reduxStates}
                                    renderItem={renderItem}
                                />
                            )
                            :
                            (
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <Text style={{ color: 'white', fontSize: 30 }}>No Data</Text>
                                </View>
                            )
                    }

                    <TouchableOpacity activeOpacity={.8} style={styles.btn}
                        onPress={() => setVisible(true)}
                    >
                        <Text style={styles.btn1}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
                <Modal visible={visible} transparent>
                    <View style={styles.modalHeader}>
                        <View style={styles.modelSection}>
                            <TextInput
                                value={inputVal}
                                onChangeText={value => setInputVal(value)}
                                style={styles.inputtext}
                                placeholder={"Search Here"}
                                placeholderTextColor={"black"}
                            />
                            <View style={styles.buttons}>
                                <TouchableOpacity activeOpacity={.8} style={styles.addButton}
                                    onPress={() => {
                                        addItems()
                                        setVisible(false)
                                    }}
                                >
                                    <Text style={styles.addBtn}>
                                        Submit
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={.8} style={styles.addButton1}
                                    onPress={() => setVisible(false)}
                                >
                                    <Text style={styles.addBtn}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        </>
    )
}

export default NewTodoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "15%",
        backgroundColor: "#0AB6AB",

    },
    headerSection: {
        flex: 0.3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    header: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 10,
    },

    backicon: {
        marginLeft: 15,
    },
    dotes: {
        marginRight: 15,
    },
    middleSection: {
        flex: 1.5,
        backgroundColor: "#0C0C0C",
    },

    heading: {
        marginTop: 40,
        color: "#fff",
        fontSize: 20,
        marginLeft: 20,
    },

    heading1: {
        marginTop: 20,
        color: "lightgray",
        fontSize: 20,
        marginLeft: 20,
    },

    text1: {
        fontSize: 20,
        color: "#fff",
        marginRight: 70,
    },

    list: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 40,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 15,
        borderStyle: "solid",
        backgroundColor: "#201F1F",
        alignItems: "center",
        height: 80
    },

    list1: {
        marginTop: 8,
        marginLeft: 15,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        borderStyle: "solid",
        backgroundColor: "#201F1F",
        padding: 20,
        margin: 20,
    },

    strikethroughText: {
        textDecorationLine: 'line-through',
        fontSize: 20,
    },

    btn: {
        color: "#fff",
        position: "absolute",
        fontSize: 40,
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 10,
        width: "25%",
        height: "15%",
        backgroundColor: "#0AB6AB",
        borderRadius: 70,
    },

    btn1: {
        color: "#fff",
        fontSize: 70,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 5
    },

    checkBox: {
        color: "#fff",
        fontSize: 20,
    },

    modalHeader: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: "10%",
    },
    modelSection: {
        width: "90%",
        height: "30%",
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    inputtext: {
        marginTop: 40,
        borderWidth: 1,
        borderColor: "silver",
        borderStyle: "solid",
        borderColor: "black",
        width: "90%",
        borderRadius: 20,
        paddingLeft: 20,
        left: 20,
        fontSize: 20
    },
    addBtn: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
    },

    addButton: {
        width: "30%",
        height: 40,
        justifyContent: "center",
        backgroundColor: "royalblue",
        marginTop: 20,
        borderRadius: 20,
    },

    addButton1: {
        width: "30%",
        height: 40,
        justifyContent: "center",
        backgroundColor: "royalblue",
        marginTop: 20,
        borderRadius: 20,
    },

    buttons: {
        marginTop: "10%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    delete: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    edit: {
        width: 35,
        height: 35,
        resizeMode: "contain",
    },
});