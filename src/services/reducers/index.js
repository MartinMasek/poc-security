import { profileReducer } from './profile'

export default function mainReducer(state = {}, action = {}) {
    console.debug("MAIN REDUCER CALLED with action " + action.type)
    return {
        profile: profileReducer(state.profile, action)
    }
}