import { SET_POSTS } from "./types";

export const setPosts = posts => ({
    type: SET_POSTS,
    payload: { posts }
})