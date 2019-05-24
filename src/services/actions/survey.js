import { AsyncStorage } from 'react-native';
import store from "../../../store";
import { LOCAL_STORAGE_KEY } from '../constants';

export const UPDATE_INPUT = "UPDATE_INPUT"

export const updateInput = (surveyId, sectionId, questionIndex, inputId, value) => {
    return async dispatch => {
        try {
            console.debug(`Updating input id ${inputId} to value '${value}'`)
            // We assume happy path and that the data are synced on device to local storage
            dispatch({
                type: UPDATE_INPUT,
                payload: { surveyId, sectionId, questionIndex, inputId, value }
            })
            console.debug("Storing to local device store");
            // This simulates saving data to the local device storage
            // await new Promise((res, rej) => {
            //     setTimeout(() => res("S"), 500);
            // })
            // dispatch(persistDataToLocalStorage());
            await _persistStateToLocalStorage(store.getState());
            console.debug("[Finished] Storing to local device store");
        }
        catch (error) {
            dispatch(setErrorMsg(error ? error.toString() : "Unknown error - empty"));
        }
    }
}

const _persistStateToLocalStorage = async (state) => {
    try {
        const serializedState = JSON.stringify(state);
        await AsyncStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    }
    catch (error) {
        alert("Couldn't save data to local storage" + error.toString());
    }
}