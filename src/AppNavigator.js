// recipe app screen....! 
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//All Screens
import Splash from './Splash';
import Login from './Screens/Login';
import SignUp from './Screens/Signup';
import ProfileScreen from './Screens/ProfileScreen';
import HomeScreen from './HomeScreen';
import QuestionDetails from './QuestionDetails';
import QuestionProgress from './QuestionProgress';
import QuestionScreen from './QuestionScreen';
import Icon from "react-native-vector-icons/Entypo";

const StackNav = () => {
    const navigation = useNavigation();
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='HomeScreen'
            screenOptions={{
                statusBarColor: "#0163d2",
                headerStyle: {
                    backgroundColor: "#0163d2"
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
                headerLeft: () => {
                    return (
                        <Icon
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                            name="menu"
                            size={30}
                            color="#fff"
                        />
                    )
                }
            }}
        >
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='QuestionDetails' component={QuestionDetails} />
            <Stack.Screen name='QuestionScreen' component={QuestionScreen} />
            <Stack.Screen name='QuestionProgress' component={QuestionProgress} />

        </Stack.Navigator>
    )
}

const DrawerNav = () => {
    const DrawerStack = createDrawerNavigator();
    const { Navigator, Screen } = DrawerStack;
    return (
        <Navigator screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: "#5e5e5c"
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center"
        }}>
            <Screen name='login' component={StackNav} />

        </Navigator>
    )
}

const AppNavigator = () => {

    return (
        <NavigationContainer>
            <DrawerNav />
        </NavigationContainer>
    )
}

export default AppNavigator;

const styles = StyleSheet.create({})