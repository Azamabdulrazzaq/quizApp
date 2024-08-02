// All cases related to user reducer are defined here...!

import { createSlice } from "@reduxjs/toolkit";
import { Text } from "react-native";

const initialState = {
    userName: "Azam-Shah",
    todoBucket: [],
    value: 0,
    users: [],
    //Note todoList Functionality...!
    todoListItem: [],
    newTodoItem: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserName: (state, actions) => {
            let { payload } = actions;
            console.log("PayLoad", payload);
            state.userName = payload;
        },

        addItem: (state, actions) => {
            let { payload } = actions;
            console.log("working", payload);

            let todoBucketClone = [...state.todoBucket];
            todoBucketClone.push(payload);
            state.todoBucket = todoBucketClone;
        },
        deleteItem: (state, actions) => {
            let { payload } = actions;
            console.log("delete Item", payload);

            let todoBucketClone = [...state.todoBucket]
            todoBucketClone.splice(payload, 1);
            state.todoBucket = todoBucketClone;
        },
        updateItem: (state, actions) => {
            let { payload } = actions;
            console.log("payloadupdateData", payload);

            let todoBucketClone = [...state.todoBucket]
            todoBucketClone.splice(
                payload.key,
                1,
                payload.newValue
            )
            state.todoBucket = todoBucketClone
        },

        deleteAllItems: (state, actions) => {
            state.todoBucket = [];
        },
        increamentCounter: (state, actions) => {
            let { payload } = actions;
            console.log(payload)
            state.value += 1
        },

        decreamentCounter: (state, actions) => {
            let { payload } = actions;
            console.log(payload)
            state.value -= 1
        },

        allApiUsers: (state, actions) => {
            let { payload } = actions;
            state.users = payload
        },

        // Note TodoListApp reducers in redux....!

        addItemList: (state, actions) => {
            let { payload } = actions;

            let todoListClone = [...state.todoListItem]
            todoListClone.push(payload)
            state.todoListItem = todoListClone
        },

        deleteOneItem: (state, actions) => {
            let { payload } = actions;

            let todoListClone = [...state.todoListItem]
            todoListClone.splice(payload, 1)
            state.todoListItem = todoListClone;
        },

        updateItemList: (state, actions) => {
            let { payload } = actions;

            let todoListClone = [...state.todoListItem]
            todoListClone.splice(
                payload.key,
                1,
                payload.newvalue
            )
            state.todoListItem = todoListClone;
        },
        deleteItemAll: (state, actions) => {
            state.todoListItem = []
        },
        newAddItem: (state, actions) => {
            let { payload } = actions;

            const newData = {
                id: Date.now(),
                text: payload.value,
                date: `${payload.curTime} | ${payload.currentDate}`,
                status: false,
            }
            let todoBucketNew =
                [...state.newTodoItem,
                    newData
                ]
            state.newTodoItem = todoBucketNew
        },

        newDeleteItem: (state, actions) => {
            let { payload } = actions;

            let deleteItem = state.newTodoItem.filter((item) => item.id !== payload)
            state.newTodoItem = deleteItem
        },

        newUpdateItem: (state, actions) => {
            let { payload } = actions;
            console.log("payload", payload)
            const indexValue = state.newTodoItem.findIndex((item) => item.id == payload.id);
            const updateValue = [...state.newTodoItem]
            updateValue.splice(indexValue, 1, payload)
            state.newTodoItem = updateValue;
        },

        // toggleTodo: (state, action) => {
        //     const todo = state.find(todo => todo.id === action.payload);
        //     if (todo) {
        //         todo.completed = !todo.completed;
        //     }
        // },

    },
});
export const {
    updateUserName,
    addItem,
    deleteItem,
    updateItem,
    deleteAllItems,
    decreamentCounter,
    increamentCounter,
    allApiUsers,
    addItemList,
    deleteOneItem,
    updateItemList,
    deleteItemAll,
    newAddItem,
    newDeleteItem,
    newUpdateItem,
    toggleTodo,
} = userSlice.actions;
export default userSlice.reducer;

