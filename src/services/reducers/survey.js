import { isObjectEmpty } from "../api/utils";
import { UPDATE_INPUT } from "../actions/survey";

export const getSurveyList = (state) => {
    if (!state.surveys) return [];
    return (state.surveys);
}

export const getSurveySections = (state, surveyId) => {
    if (surveyId == null || surveyId == undefined) return {};
    const survey = state.surveys.find(s => s.id == surveyId);
    const sections = survey.sections;
    // We want to group each section under the area it belongs to
    const result = [{ area: sections[0].area, sections: [] }]
    let currentAreaIndex = 0;
    for (let i = 0; i < sections.length; i++) {
        const s = sections[i];
        if (s.area != result[currentAreaIndex].area) {
            result.push({ area: s.area, sections: [] });
            currentAreaIndex++;
        }
        result[currentAreaIndex].sections.push(_extractSectionInfo(s));
    }
    return {
        id: survey.id,
        name: survey.name,
        isError: survey.isError,
        errorMsg: survey.errorMsg,
        data: result
    }
}

export const getSectionData = (state, surveyId, sectionId) => {
    if (sectionId == null || sectionId == undefined) return {};
    if (surveyId == null || surveyId == undefined) return {};
    const surveyData = state.surveys.find(s => s.id == surveyId);
    if (surveyData == null || surveyData == undefined || isObjectEmpty(surveyData)) return {};
    const sectionData = surveyData.sections.find(s => s.id == sectionId);
    return sectionData;
}

export function surveyReducer(state = [], action = { type: {}, payload: {} }) {
    switch (action.type) {
        case UPDATE_INPUT: {
            const { surveyId, sectionId, questionIndex, inputId, value } = action.payload;
            let result = [];
            for (let i = 0; i < state.length; i++) {
                let survey = Object.assign({}, state[i]);
                if (survey.id == surveyId) {
                    const newSections = survey.sections.map(s => {
                        if (s.id != sectionId) return s;
                        const newQuestions = [...s.questions];
                        const newInputs = newQuestions[questionIndex].inputs.map(input => {
                            if (input.id != inputId) return input;
                            return Object.assign({}, input, { value: value });
                        })
                        newQuestions[questionIndex].inputs = newInputs;
                        s.questions = newQuestions;
                        return s;
                    });
                    survey.sections = newSections;
                }
                result.push(survey);
            }
            return result;
        }
        default:
            return state;
    }
}

const _extractSectionInfo = (section) => {
    return {
        id: section.id,
        code: section.code,
        name: section.name,
        lastServerSync: section.lastServerSync,
        lastModification: section.lastModification
    }
}