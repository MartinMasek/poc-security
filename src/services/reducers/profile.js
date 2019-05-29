import decode from 'jwt-decode'

import { SET_PROFILE, CLEAR_PROFILE } from "../actions/profile";

const initState = {
    accessToken: null
}

export const getProfileFromToken = (state) => {
    const token = state.profile.accessToken;
    if (!token) return {};
    try {
        const result = decode(token);
        return {
            email: result.upn,
            name: result.name
        }
    }
    catch (error) {
        alert("Couldn't decode token");
        return {}
    }
}

export const isUserLogged = (state) => {
    if (!state.profile) return false;
    return (state.profile.accessToken !== null && state.profile.accessToken !== undefined);
}

export function profileReducer(state = initState, action = { type: {}, payload: {} }) {
    switch (action.type) {
        case SET_PROFILE:
            return Object.assign({}, state, action.payload);
        case CLEAR_PROFILE:
            return Object.assign({}, state, {
                accessToken: null
            });
        default:
            return state;
    }
}