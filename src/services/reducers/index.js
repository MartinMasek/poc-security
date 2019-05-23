import { profileReducer } from './profile'
import { surveyReducer } from './survey';
import { LOAD_APP_DATA } from '../actions/app';

export default function mainReducer(state = {}, action = {}) {
    console.debug("MAIN REDUCER CALLED with action " + action.type)
    // console.debug(action.payload)

    if (action.type == LOAD_APP_DATA) {
        return {
            profile: Object.assign({}, state.profile),
            surveys: action.payload.surveys
        }
    }
    return {
        profile: profileReducer(state.profile, action),
        surveys: surveyReducer(state.surveys, action)
    }
}