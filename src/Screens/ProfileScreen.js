import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const ProfileScreen = () => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    const getAllData = async () => {
        // const currentUser = await JSON.parse(token);
        // console.log(currentUser)
        try {
            const token = await AsyncStorage.getItem('usertoken');
            console.log(JSON.parse(token))
            if (token) {
                const response = await axios.post("http://192.168.100.8:8080/user/varify", { token: token })
                console.log('Server response:', response.data);
                setUserData(response.data.data)
            }
        }

        catch (error) {
            console.log("Error", error)
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getAllData()
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{userData?.name}</Text>
            </View>
            <View style={styles.maincontainer}>
                <View style={styles.infoContainer}>
                    <Icon name="email-multiple-outline" size={30} color="orange" />
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoValue}>{userData?.email}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Icon name="professional-hexagon" size={30} color="purple" />
                    <Text style={styles.infoLabel}>Profession:</Text>
                    <Text style={styles.infoValue}>Developer</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Entypo name="users" size={30} color="green" />
                    <Text style={styles.infoLabel}>Gerder:</Text>
                    <Text style={styles.infoValue}>{userData?.gender}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Entypo name="mobile" size={30} color="red" />
                    <Text style={styles.infoLabel}>Mobile No:</Text>
                    <Text style={styles.infoValue}>{userData?.contactNum}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },

    header: {
        backgroundColor: '#00BFFF',
        height: 200,
        borderRadius: 20,
    },
    avatarContainer: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 30
    },
    infoContainer: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row"
    },
    infoLabel: {
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 20

    },
    infoValue: {
        marginLeft: 15,
        fontSize: 18
    },
    maincontainer: {
        marginTop: "35%"
    },
});

export default ProfileScreen;

// import React from 'react'
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

// export default Profile = () => {

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}></View>
//             <Image
//                 style={styles.avatar}
//                 source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
//             />
//             <View style={styles.body}>
//                 <View style={styles.bodyContent}>
//                     <Text style={styles.name}>John Doe</Text>
//                     <Text style={styles.info}>UX Designer / Mobile developer</Text>
//                     <Text style={styles.description}>
//                         Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis,
//                         omittam deseruisse consequuntur ius an,
//                     </Text>
//                     <Text>  Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis,
//                         omittam deseruisse consequuntur ius an,</Text>

//                     <TouchableOpacity style={styles.buttonContainer}>
//                         <Text>Opcion 1</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.buttonContainer}>
//                         <Text>Opcion 2</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     header: {
//         backgroundColor: '#00BFFF',
//         height: 200,
//     },
//     avatar: {
//         width: 130,
//         height: 130,
//         borderRadius: 63,
//         borderWidth: 4,
//         borderColor: 'white',
//         marginBottom: 10,
//         alignSelf: 'center',
//         position: 'absolute',
//         marginTop: 130,
//     },
//     name: {
//         fontSize: 22,
//         color: '#000',
//         fontWeight: '600',
//     },
//     body: {
//         marginTop: 80,
//     },
//     bodyContent: {
//         flex: 1,
//         alignItems: 'center',
//         padding: 30,
//     },
//     name: {
//         fontSize: 28,
//         color: '#696969',
//         fontWeight: '600',
//     },
//     info: {
//         fontSize: 16,
//         color: '#000',
//         marginTop: 10,
//     },
//     description: {
//         fontSize: 16,
//         color: '#696969',
//         marginTop: 10,
//         textAlign: 'center',
//     },
//     buttonContainer: {
//         marginTop: 10,
//         height: 45,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 20,
//         width: 250,
//         borderRadius: 30,
//         backgroundColor: '#00BFFF',
//     },
// })