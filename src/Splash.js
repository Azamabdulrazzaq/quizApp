import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import image from './images/quiz-logo.png'


const Splash = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Login");
        }, 3000);
    }, []);
    return (
        <View style={styles.container}>
            <Animatable.Image animation={'slideOutUp'}
                source={image}
                style={styles.img}
            />

            <Animatable.Text animation={"slideOutDown"} style={styles.appName}>Learning App</Animatable.Text>
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    appName: {
        color: "skyblue",
        fontSize: 40,
        fontWeight: "bold",
        fontFamily: "Cochin"
    },

})