import { SET_POSTS } from "./types"

const initialState = null

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return [...action.payload.posts]
        default:
            return state
    }
}

export default postsReducer