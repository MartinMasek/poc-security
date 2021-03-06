import { isObjectEmpty, computeTotalProgressOfSurvey, computeCompletedQuestions } from "../api/utils";
import { UPDATE_INPUT, REFRESH_SURVEY_LIST } from "../actions/survey";

export const getSurveyList = (state) => {
    if (!state.surveys) return [];
    return (state.surveys.map(s => {
        return {
            id: s.id,
            name: s.name,
            progress: s.progress
        }
    }));
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
    sectionData.completedQuestions = sectionData.completedQuestions;
    sectionData.totalQuestions = sectionData.questions.length;
    return sectionData;
}

export function surveyReducer(state = [], action = { type: {}, payload: {} }) {
    switch (action.type) {
        case UPDATE_INPUT: {
            const { surveyId, sectionId, questionIndex, inputId, value } = action.payload;
            return _handleUpdateInput(state, surveyId, sectionId, questionIndex, inputId, value);
        }
        case REFRESH_SURVEY_LIST: {
            return _handleRefreshSurveyList(state, action.payload);
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
        lastModification: section.lastModification,
        completedQuestions: (section.completedQuestions !== undefined || section.completedQuestions != null) ? section.completedQuestions : 0,
        totalQuestions: section.questions.length
    }
}

const _handleUpdateInput = (state, surveyId, sectionId, questionIndex, inputId, value) => {
    let result = [];
    for (let i = 0; i < state.length; i++) {
        let survey = Object.assign({}, state[i]);
        if (survey.id == surveyId) {
            const newSections = survey.sections.map(s => {
                if (s.id != sectionId) return s;
                const sectionClone = JSON.parse(JSON.stringify(s));
                const inputs = sectionClone.questions[questionIndex].inputs;
                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].id == inputId) {
                        inputs[i].value = value;
                        break;
                    }
                    if (inputs[i].conditional && inputs[i].conditionalInput.id == inputId) {
                        inputs[i].conditionalInput.value = value;
                        break;
                    }
                }
                sectionClone.lastModification = Date.now();
                sectionClone.completedQuestions = computeCompletedQuestions(sectionClone.questions);
                return sectionClone;
            })
            survey.sections = newSections;
        }
        survey.progress = computeTotalProgressOfSurvey(survey.sections);
        result.push(survey);
    }
    return result;
}

const _handleRefreshSurveyList = (state, newList) => {
    // We assume lists to be very short so this O(n2) algorithm is good enough
    for (let i = 0; i < newList.length; i++) {
        const newOne = newList[i];
        for (let j = 0; j < state.length; j++) {
            const old = state[j];
            if (old.id == newOne.id) {
                // merge the current section data if there is any
                newList[i] = Object.assign(old, newOne);
            }
        }
    }
    return newList;
}