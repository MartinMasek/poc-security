import { AsyncStorage } from 'react-native';
import store from '../../../store'

const LOCAL_STORAGE_KEY = "SERIALIZED_STATE";
const ACCESS_TOKEN_KEY = "ACCESS_TOKEN"
const SURVEY_LIST_KEY = "SURVEY_LIST_KEY"

export const saveAccessToken = async (token) => {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export const persistStateToLocalStorage = async () => {
    const serializedState = JSON.stringify(store.getState());
    await AsyncStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
}

export const clearLocalStorage = async () => {
    await AsyncStorage.clear();
}