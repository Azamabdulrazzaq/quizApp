// Main reducer file...!

import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user-reducer/user-reducer";


const rootReducer = combineReducers({
    userStates: userReducer
});

export default rootReducer;