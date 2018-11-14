import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools} from "redux-devtools-extension"
import blogReducer from "./components/reducers/blogReducer"
import userReducer from "./components/reducers/userReducer"
import notificationReducer from "./components/reducers/notificationReducer"
import userbaseReducer from "./components/reducers/userbaseReducer"

const reducer = combineReducers({
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
    userbase: userbaseReducer
  })
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
  
  export default store
  