import { combineReducers } from "redux"
import authReducer from "./auth/authReducer"
import addPostReducer from './addPost/addPostReducer'
import postsReducer from "./posts/postsReducer"

const rootReducer = combineReducers({auth: authReducer, addPost: addPostReducer, posts: postsReducer})

export default rootReducer