
export default function mainReducer(state = { loginSuccess: true }, action = {}) {
    console.debug("MAIN REDUCER CALLED with action " + action.type)
    return state
}