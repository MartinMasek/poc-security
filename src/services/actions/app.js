import { setErrorMsg } from "./error";

export const LOAD_APP_DATA = "LOAD_APP_DATA"

export const loadAppData = () => {
    return async dispatch => {
        try {
            // This simulates fetching data from the server or local DB
            const data = await new Promise((res, rej) => {
                setTimeout(() => res(require('../../../assets/data/mock_v2.json')), 600);
            })
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