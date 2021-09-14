import { CLEAR, ERRORS, INPUT_FIELD } from "./types";

export const inputField = (field, content) => ({
    type: INPUT_FIELD,
    payload: {field, content}
})

export const setErrors = errors => ({
    type: ERRORS,
    payload: {errors}
})

export const clear = () => ({
    type: CLEAR
})