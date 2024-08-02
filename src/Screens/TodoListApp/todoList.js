import { StyleSheet, Text, TextInput, View, Button, Keyboard } from 'react-native'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemList, deleteOneItem, updateItemList, deleteItemAll } from '../../redux/reducers/user-reducer/user-reducer';


const TodoList = () => {

    // States...!

    const [inputVal, setInputVal] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [key, setKey] = useState("");

    // Note dispatch a function in redux States....!

    const dispatch = useDispatch();

    // Note in this function get all data from redux States...!


    const reduxStates = useSelector(({ userStates }) => { return userStates.todoListItem });
    console.log("Redux States", reduxStates)
    // Note this function is an Add item..!
    const addItemHandler = () => {
        dispatch(addItemList(inputVal));
        setInputVal("");
        Keyboard.dismiss();
    };

    // Note this function is an Add item..!

    const deleteItemHandler = (key) => {
        dispatch(deleteOneItem(key));
    };

    const editItemHandler = (data, key) => {


        setInputVal(data);
        setIsEdit(true)
        setKey(key)
    }

    const updateItemHandler = () => {
        let todoBucket = {
            newvalue: inputVal,
            key
        }
        dispatch(updateItemList(todoBucket));
        setInputVal("");
        setKey("");
        setIsEdit(false);
        Keyboard.dismiss();
    }

    return (
        <View>
            <Text style={{ fontSize: 25 }}>Todo List App with Redux </Text>

            <TextInput
                style={{ fontSize: 20 }}
                placeholder='AnyThing Search Here'
                value={inputVal}
                onChangeText={value => setInputVal(value)}
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
                            title='delete All Item'
                            onPress={() => dispatch(deleteItemAll())}
                        />
                    </>

            }
            {
                reduxStates.map((item, index) => {
                    return (
                        <View key={index}>
                            <Text key={index}
                                style={{ fontSize: 20, color: "black" }
                                }>
                                {item}
                            </Text>

                            <Button
                                title='Delete Item'
                                onPress={() => deleteItemHandler(index)}
                            />


                            <Button
                                title='Edit Item'
                                onPress={() => editItemHandler(item, index)}
                            />
                        </View>
                    )

                })
            }
        </View>
    )
}

export default TodoList;

const styles = StyleSheet.create({});