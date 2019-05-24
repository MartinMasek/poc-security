import { setErrorMsg } from "./error";
import { AsyncStorage } from 'react-native';
import { LOCAL_STORAGE_KEY } from "../constants";

export const LOAD_APP_DATA = "LOAD_APP_DATA"

export const loadAppData = () => {
    return async dispatch => {
        try {
            const data = await _retrieveStorageData();
            dispatch({
                type: LOAD_APP_DATA,
                payload: data
            })
        }
        catch (error) {
            dispatch(setErrorMsg(error ? error.toString() : "Unknown error - empty"));
        }
    }
}

const _retrieveStorageData = async () => {
    try {
        const serializedState = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedState == null) {
            console.debug(" ---  No local data found --- ")
            // TODO: This is just fallback, the real scenario should return an empty state
            // return {};

            const mock = require('../../../assets/data/mock_v2.json');
            await AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mock));
            return mock;
        }
        const data = JSON.parse(serializedState);
        return data;
    }
    catch (error) {
        alert("Couldn't load local data " + error.toString());
    }
}