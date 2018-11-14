import blogService from "../../services/blogs"
import loginService from "../../services/login"

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USER":
      return action.data
    case "CLEAR_USER":
      return null
    default:
      return state
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      await blogService.setToken(user.token)
      dispatch({ type: "INIT_USER", data: user })
    }
    else {
      dispatch({ type: "INIT_USER", data: null })
    }
  }
}

export const clearUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser")
    await blogService.setToken("")
    dispatch({ type: "CLEAR_USER" })
    dispatch({ type: "NOTIFY", data: "You have successfully logged out"})
    setTimeout(() => {
      dispatch({type: "NOTIFY", data: ""})
    }, 5000)
  }
}

export const login = (user) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await loginService.login(user)
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      dispatch({ type: "INIT_USER", data: loggedInUser })
      dispatch({ type: "NOTIFY", data: "Welcome to the bloglist " + loggedInUser.name})
      setTimeout(() => {
        dispatch({type: "NOTIFY", data: ""})
      }, 5000)
    } catch (error) {
      dispatch({type: "NOTIFY", data: error.response.data.error})
      setTimeout(() => {
        dispatch({type: "NOTIFY", data: ""})
      }, 5000)
    }
  }
}

export default userReducer
