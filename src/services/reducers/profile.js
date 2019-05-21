import { SET_PROFILE } from "../actions/profile";

const initState = {
    accessToken: null,
    email: null
}

export const isUserLogged = (state) => {
    return (state.profile.accessToken);
}

export function profileReducer(state = initState, action = { type: {}, payload: {} }) {
    switch (action.type) {
        case SET_PROFILE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}