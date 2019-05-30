import { Network } from '../api/Network';
import { saveSectionDataById } from '../api/LocalStorage';
import { setErrorMsg } from './error';

export const UPDATE_INPUT = "UPDATE_INPUT"
export const REFRESH_SURVEY_LIST = "REFRESH_SURVEY_LIST"

export const fetchSurveySections = (surveyId, network = Network) => {
    return async dispatch => {
        try {
            // Simulate contacting the server
            await new Promise((res, rej) => {
                setTimeout(() => res("S"), 1000);
            })

            // Now we should check conflicts and decide about the resolution
        }
        catch (error) {
            dispatch(setErrorMsg(error ? error.toString() : "Unknown fetch section error - empty"));
        }
    }
}

export const fetchSurveys = (network = Network) => {
    return async dispatch => {
        try {
            const isDeviceOffline = await network.isDeviceOfflineAsync();
            if (isDeviceOffline) return;
            // Simulate contacting the server
            const data = await new Promise((res, rej) => {
                setTimeout(() => res([{
                    "id": "1",
                    "name": "Survey for Demo building 1"
                }]), 800);
            });
            dispatch({
                type: REFRESH_SURVEY_LIST,
                payload: data
            });
        }
        catch (error) {
            console.log("ERROR:");
            console.log(error);
            dispatch(setErrorMsg(error ? error.toString() : "Unknown fetch section error - empty"));
        }
    }
}

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
            await saveSectionDataById(surveyId, sectionId);
            // await persistAppStateToLocalStorage();
            console.debug("[Finished] Storing to local device store");
        }
        catch (error) {
            dispatch(setErrorMsg(error ? error.toString() : "Unknown error - empty"));
        }
    }
}