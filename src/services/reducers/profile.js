import { SET_PROFILE } from "../actions/profile";

const initState = {
    accessToken: null,
    email: null
}

export const isUserLogged = (state) => {
    if (!state.profile) return false;
    return (state.profile.accessToken !== null && state.profile.accessToken !== undefined);
}

export function profileReducer(state = initState, action = { type: {}, payload: {} }) {
    switch (action.type) {
        case SET_PROFILE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}