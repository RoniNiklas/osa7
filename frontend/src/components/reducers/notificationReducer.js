
const initialState = { notification: "" }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case "NOTIFY":
    return Object.assign({}, state, {notification: action.data})
  default:
    return state
  }
}

export const notify = (stringi, aika) => {
  return async (dispatch) => {
    dispatch({type: "NOTIFY", data: stringi})
    setTimeout(() => {
      dispatch({type: "NOTIFY", data: ""})
    },
    aika
    )
  }
}

export default notificationReducer
