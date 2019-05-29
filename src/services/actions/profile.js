import { saveAccessToken } from "../api/LocalStorage";

export const SET_PROFILE = "SET_PROFILE"
export const CLEAR_PROFILE = "CLEAR_PROFILE"
export const SAVE_ACCESS_TOKEN = "SAVE_ACCESS_TOKEN"

export const setProfile = (profileData) => {
    return {
        type: SET_PROFILE,
        payload: profileData
    }
}

export const saveAccessTokenAsync = (token) => {
    return async dispatch => {
        try {
            dispatch({
                type: SAVE_ACCESS_TOKEN,
                payload: token
            })
            await saveAccessToken(token);
            dispatch({
                type: SET_PROFILE,
                payload: { accessToken: token }
            })
        }
        catch (error) {
            alert(error ? error.toString() : "Unknown error when saving token - empty");
        }
    }
}

export const clearProfileData = () => {
    return {
        type: CLEAR_PROFILE,
        payload: {}
    }
}