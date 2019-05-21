export const SET_PROFILE = "SET_PROFILE"

export const setProfile = (profileData) => {
    return {
        type: SET_PROFILE,
        payload: profileData
    }
}