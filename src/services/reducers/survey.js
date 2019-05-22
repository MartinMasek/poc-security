import { SET_PROFILE } from "../actions/profile";

export const getSurveyList = (state) => {
    if (!state.surveys) return [];
    return (state.surveys);
}

export function surveyReducer(state, action = { type: {}, payload: {} }) {
    switch (action.type) {
        default:
            return state;
    }
}