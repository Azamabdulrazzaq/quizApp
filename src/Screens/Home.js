import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { updateUserName } from '../redux/reducers/user-reducer/user-reducer';
const home = () => {
    // Note dispatch function...!
    const dispatch = useDispatch();
    // Note we are fatching hook from redux...!

    const fetchUserName = useSelector(({ userStates }) => { return userStates.userName })
    console.log("fetch name states redux :", fetchUserName);

    const updateHandler = () => {
        console.log("Testing");
        let newName = "Muhammad Ali"
        dispatch(updateUserName(newName));
    }

    return (
        <View>
            <Text style={{ fontSize: 30 }}>
                wellcome to redux with react native
            </Text>

            <Text style={{ fontSize: 30 }}>
                {`Name : ${fetchUserName}`}
            </Text>

            <Button
                title='Update Nmae'
                onPress={updateHandler}
            />
        </View>
    )
}

export default home;