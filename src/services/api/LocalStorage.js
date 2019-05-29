import { AsyncStorage } from 'react-native';
import store from '../../../store'

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN"
const SURVEY_LIST_KEY = "SURVEY_LIST_KEY"

export const saveAccessToken = async (token) => {
    if (token == null) await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    else await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export const persistAppStateToLocalStorage = async () => {
    const data = store.getState();

    const surveyListWithoutSections = [];
    for (let i = 0; i < data.surveys.length; i++) {
        const survey = data.surveys[i];
        const surveyMetadata = {
            id: survey.id,
            name: survey.name,
            sectionIds: []
        }
        for (let j = 0; j < survey.sections.length; j++) {
            const section = survey.sections[j];
            surveyMetadata.sectionIds.push(section.id);
            await saveSectionData(survey.id, section);
        }
        surveyListWithoutSections.push(surveyMetadata);
    }
    await AsyncStorage.setItem(SURVEY_LIST_KEY, JSON.stringify(surveyListWithoutSections));
    await saveAccessToken(data.profile ? data.profile.accessToken : null);
}

export const getPersistedAppState = async () => {
    const result = { profile: null, surveys: [] };
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    result.profile = { accessToken: accessToken };

    const surveyListSerialized = await AsyncStorage.getItem(SURVEY_LIST_KEY);
    const surveyLists = JSON.parse(surveyListSerialized);
    if (!surveyLists) return result;

    for (let i = 0; i < surveyLists.length; i++) {
        const surveyMetadata = surveyLists[i];
        const survey = {
            id: surveyMetadata.id,
            name: surveyMetadata.name,
            sections: []
        }

        for (let j = 0; j < surveyMetadata.sectionIds.length; j++) {
            const sectionId = surveyMetadata.sectionIds[j];
            const data = await getSectionData(survey.id, sectionId);
            survey.sections.push(data);
        }
        result.surveys.push(survey);
    }

    return result;
}

export const clearLocalStorage = async () => {
    await AsyncStorage.clear();
}

export const saveSectionDataById = async (surveyId, sectionId) => {
    const data = store.getState();
    const survey = data.surveys.find(s => s.id == surveyId);
    const section = survey.sections.find(s => s.id == sectionId);
    await saveSectionData(surveyId, section);
}

export const saveSectionData = async (surveyId, section) => {
    const compositeKey = `${surveyId}${section.id}`;
    const serializedData = JSON.stringify(section);
    await AsyncStorage.setItem(compositeKey, serializedData);
}

export const getSectionData = async (surveyId, sectionId) => {
    const compositeKey = `${surveyId}${sectionId}`;
    const data = await AsyncStorage.getItem(compositeKey);
    return JSON.parse(data);
}