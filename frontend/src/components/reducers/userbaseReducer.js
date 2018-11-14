import userbaseService from "../../services/userbase"

// contains unused placeholders

const userbaseReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NEW_USER":
      return 
    case "INIT_USERBASE":
      return action.data
    case "DELETE_USER":
      return 
    default:
      return state
  }
}

export const createNew = (blogToUpload) => {
  return async (dispatch) => {
  }
}

export const deleteOne = (blog) => {
  return async (dispatch) => {
  }
}

export const initializeUserbase = () => {
  return async (dispatch) => {
    const userbase = await userbaseService.getAll()
    dispatch({ type: "INIT_USERBASE", data: userbase })
  }
}

export default userbaseReducer
