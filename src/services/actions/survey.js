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
            await new Promise((res, rej) => {
                setTimeout(() => res("S"), 500);
            })
        }
        catch (error) {
            dispatch(setErrorMsg(error ? error.toString() : "Unknown error - empty"));
        }
    }
}