import { SET_PROFILE } from "../actions/profile";

export const getSurveyList = (state) => {
    if (!state.surveys) return [];
    return (state.surveys);
}

export const getSurveyData = (state, surveyId) => {
    if (surveyId == null || surveyId == undefined) return {};
    const data = state.surveys.find(s => s.id == surveyId);
    return data;
}

export function surveyReducer(state, action = { type: {}, payload: {} }) {
    switch (action.type) {
        default:
            return state;
    }
}