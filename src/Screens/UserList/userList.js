import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { allApiUsers } from '../../redux/reducers/user-reducer/user-reducer';
import UserProfile from '../../images/users.jpg';
import Icons from 'react-native-vector-icons/Entypo';


const UserList = () => {
    // States...!
    const [searchBar, setSearchBar] = useState("");
    // Note States Dispatch is here...!

    const dispatch = useDispatch();

    // Note this is a redux States from userReducer....!

    const reduxStates = useSelector(({ userStates }) => { return userStates.users })
        .filter((item) => { return item.firstName.toLowerCase().includes(searchBar.toLowerCase()) });
    // console.log("redux States", reduxStates);

    // Note function to fetchAllUsers from an api with redux...!
    const fetchAllUsers = () => {
        const apiUrl = "https://dummyjson.com/users";

        fetch(apiUrl)
            .then((res) => {
                return (
                    res.json()
                )
            })
            .then((data) => {
                let userData = data.users
                userData && dispatch(allApiUsers(userData))
            })
            .catch(error => console.log("Something went wrong", error))
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.section_1}>
                <View style={styles.header_section}>
                    <Image
                        source={UserProfile}
                        style={styles.userProfile}
                    />
                    <View style={styles.info_Section}>
                        <Text style={styles.userName}>nicole_Smith</Text>
                        <Text style={styles.userId}>@Nicole_Smith</Text>
                    </View>
                </View>
                <View style={styles.screen_section}>
                    <View style={styles.innerScreenLink}>
                        <Text style={styles.innerContent}>all</Text>
                    </View>
                    <View style={styles.innerScreenLink}>
                        <Text style={styles.innerContent}>athletes</Text>
                    </View>
                    <View style={styles.innerScreenLink}>
                        <Text style={styles.innerContent}>fans</Text>
                    </View>
                    <View style={styles.innerScreenLink}>
                        <Text style={styles.innerContent}>teams</Text>
                    </View>
                </View>
                <View style={styles.searchBar_section}>
                    <TextInput
                        placeholder='search for friends'
                        placeholderTextColor={"black"}
                        style={styles.searchBar}
                        value={searchBar || ""}
                        onChangeText={value => setSearchBar(value)}
                    />
                </View>
            </View>
            <View style={styles.section_2}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        reduxStates.map((item, index) => {
                            return (
                                <View
                                    style={styles.userSection}
                                    key={index}
                                >
                                    <View style={styles.userDetails}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={styles.userProfile}
                                        />
                                        <Text style={styles.users}>{item.firstName + " " + item.lastName}</Text>
                                    </View>
                                    <Icons
                                        name="arrow-right"
                                        size={30}
                                        color="black"
                                    />
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>

    )
}

export default UserList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section_1: {
        flex: 1.4,
    },
    section_2: {
        backgroundColor: "whitesmoke",
        flex: 3.6,
        paddingHorizontal: 5,
    },
    header_section: {
        backgroundColor: "#776B5D",
        flex: 0.8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    screen_section: {
        backgroundColor: "silver",
        flex: 0.6,
        display: "flex",
        flexDirection: "row",
    },
    searchBar_section: {
        backgroundColor: "white",
        flex: 0.6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    userProfile: {
        height: 60,
        width: 60,
        resizeMode: "contain",
    },
    info_Section: {
        paddingHorizontal: 15,
    },
    userName: {
        color: "white",
        fontSize: 22,
        textTransform: "capitalize",
    },
    users: {
        color: "black",
        fontSize: 22,
        textTransform: "capitalize",
    },
    userId: {
        color: "white",
        fontSize: 18,
    },
    innerScreenLink: {
        backgroundColor: "#F47564",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContent: {
        fontSize: 18,
        textTransform: "capitalize",
        color: "#fff",
    },
    searchBar: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "silver",
        borderRadius: 10,
        color: "#000",
        fontSize: 18,
        width: "95%",
        paddingLeft: 10,
    },

    userSection: {
        backgroundColor: "silver",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 10,
        borderRadius: 10,
        marginVertical: 7,
    },
    userDetails: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    }
})




