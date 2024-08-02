import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increamentCounter, decreamentCounter } from '../../redux/reducers/user-reducer/user-reducer';

const Counter = () => {
    // Note function dispatch is here....!
    const dispatch = useDispatch();

    // Note Fetch data from redux states is here....!

    const fetchCounterStates = useSelector(({ userStates }) => { return userStates.value })
    console.log("redux States", fetchCounterStates)
    return (
        <View style={styles.container}>
            <Text style={styles.Heading}>Counter With Redux Ststes</Text>
            <Text>{`Counter ${fetchCounterStates}`}</Text>

            <Button
                style={styles.btn1}
                title='Increment Counter'
                onPress={() => { dispatch(increamentCounter()) }}
            />
            <Button
                style={styles.btn2}
                title='Decreament Counter'
                onPress={() => { dispatch(decreamentCounter()) }}
            />
        </View>
    )
}

export default Counter;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    Heading: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
    },

    btn1: {
        marginTop: 20,
    },
    btn2: {
        marginTop: 20,
    },
});