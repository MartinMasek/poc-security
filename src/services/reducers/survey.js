import { SET_PROFILE } from "../actions/profile";
import { isObjectEmpty } from "../api/utils";

export const getSurveyList = (state) => {
    if (!state.surveys) return [];
    return (state.surveys);
}

export const getSurveyData = (state, surveyId) => {
    if (surveyId == null || surveyId == undefined) return {};
    const data = state.surveys.find(s => s.id == surveyId);
    return data;
}

export const getSectionData = (state, surveyId, sectionId) => {
    if (sectionId == null || sectionId == undefined) return {};
    if (surveyId == null || surveyId == undefined) return {};
    const surveyData = state.surveys.find(s => s.id == surveyId);
    if (surveyData == null || surveyData == undefined || isObjectEmpty(surveyData)) return {};
    let sectionData = null;
    surveyData.areas.forEach(area => {
        if (sectionData) return; // break if we found it
        area.sections.forEach(section => {
            if (sectionData) return; // break if we found it
            if (section.id == sectionId) sectionData = section;
        });
    });
    if (sectionData == null) return {};
    return sectionData;
}

export function surveyReducer(state, action = { type: {}, payload: {} }) {
    switch (action.type) {
        default:
            return state;
    }
}