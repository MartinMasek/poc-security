import { profileReducer } from './profile'
import { surveyReducer } from './survey';
import { LOAD_APP_DATA } from '../actions/app';

export const isAppDataInMemory = (state) => {
    if (state.surveys == null || state.surveys == undefined || state.surveys.length == 0) return false;
    return true;
}

export default function mainReducer(state = {}, action = {}) {
    console.debug("MAIN REDUCER CALLED with action " + action.type)
    // console.debug(action.payload)

    if (action.type == LOAD_APP_DATA) {
        return {
            profile: action.payload.profile,
            surveys: action.payload.surveys
        }
    }
    const newState = {
        profile: profileReducer(state.profile, action),
        surveys: surveyReducer(state.surveys, action)
    }
    // console.log(">>> NEW STATE");
    // console.log(newState);
    return newState;
}