import { setErrorMsg } from "./error";
import { AsyncStorage } from 'react-native';
import { LOCAL_STORAGE_KEY } from "../constants";
import store from "../../../store";
import { getPersistedAppState } from "../api/LocalStorage";

export const LOAD_APP_DATA = "LOAD_APP_DATA"

export const loadAppData = () => {
    return async dispatch => {
        try {
            // const data = await _retrieveStorageData();
            let data = await getPersistedAppState();
            // TODO: This is just fallback, the real scenario should return an empty state
            // return {};
            if (data == null) {
                data.surveys = require('../../../assets/data/mock_v2.json').surveys;
            }
            else if (data.surveys.length == 0) {
                data.surveys = require('../../../assets/data/mock_v2.json').surveys;
            }

            dispatch({
                type: LOAD_APP_DATA,
                payload: data
            })
        }
        catch (error) {
            console.log("ERROR: " + error ? error.toString() : "Unknown error - empty");
            dispatch(setErrorMsg(error ? error.toString() : "Unknown error - empty"));
        }
    }
}