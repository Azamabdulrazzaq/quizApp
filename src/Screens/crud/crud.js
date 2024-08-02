import { StyleSheet, Text, View, TextInput, Button, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem, updateItem, deleteAll, deleteAllItems } from '../../redux/reducers/user-reducer/user-reducer';

const Crud = () => {

    // Note Function Dispatch is here...!
    const dispatch = useDispatch();
    // Note Redux TodoBucket States Is ...!
    const reduxStates = useSelector(({ userStates }) => { return userStates.todoBucket })
    console.log("fetch todoBucket states redux", reduxStates)

    // Application States...!

    const [inputVal, setInputVal] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [key, setKey] = useState("");

    // Note  function to Add an item ...!

    const addItemHandler = () => {
        dispatch(addItem(inputVal))
        setInputVal("");
    };
    // Note  function to Delete an item ...!

    const deleteItemHandler = (key) => {
        console.log("itemKey", key);
        dispatch(deleteItem(key))
    };

    // Note  function to Edit an item ...!

    const editItemHandler = (data, key) => {
        console.log("Edit Item ", key)
        console.log("data", data)

        setIsEdit(true)
        setInputVal(data)
        setKey(key)
    };
    // Note  function to Update an item ...!

    const updateItemHandler = () => {
        const updateData = {
            newValue: inputVal,
            key
        }
        dispatch(updateItem(updateData));
        setIsEdit(false)
        setInputVal("")
        setKey("")
        Keyboard.dismiss();
    };


    return (
        <View>
            <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20, color: "black" }}>
                Crud App with Redux
            </Text>
            <TextInput
                style={{ fontSize: 25 }}
                placeholder='Search Anything'
                value={inputVal}
                onChangeText={(value) => setInputVal(value)}
            />
            {
                isEdit
                    ?
                    <Button
                        title='Update Item'
                        onPress={updateItemHandler}
                        disabled={inputVal.trim().length < 1}
                    />
                    :
                    <>
                        <Button
                            title='Add Item'
                            onPress={addItemHandler}
                            disabled={inputVal.trim().length < 1}
                        />

                        <Button
                            title='delete All'
                            onPress={() => dispatch(deleteAllItems())}
                        />
                    </>
            }
            {
                reduxStates.map((item, index) => {
                    return (
                        <View key={index}>
                            <Text key={index}
                                style={{ fontSize: 20, color: "black" }}
                            >
                                {item}
                            </Text>
                            <Button
                                title='Delete Item'
                                onPress={() => deleteItemHandler(index)}
                            />
                            <Button
                                title='EDIT Item'
                                onPress={() => editItemHandler(item, index)}
                            />
                        </View>
                    )
                })
            }
        </View>
    )
}

export default Crud;

const styles = StyleSheet.create({

});
