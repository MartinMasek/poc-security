export const SET_ERROR_MSG = "SET_ERROR_MSG"

export const setErrorMsg = (message) => {
    return {
        type: SET_ERROR_MSG,
        payload: { errorMsg: message }
    }
}