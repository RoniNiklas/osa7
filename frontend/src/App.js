import React from "react"
import "./App.css"
import { initializeData } from "./components/reducers/blogReducer"
import { initializeUser } from "./components/reducers/userReducer"
import { initializeUserbase } from "./components/reducers/userbaseReducer"
import { connect } from "react-redux"
import NotificationView from "./components/NotificationView"
import BlogList from "./components/blogList"
import UserList from "./components/UserList"
import SingleUserView from "./components/SingleUserView"
import SingleBlogView from "./components/SingleBlogView"
import NewBlogForm from "./components/NewBlogForm";
import Menu from "./components/Menu"
import { BrowserRouter as Router, Route} from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      username: "",
      password: "",
    }
  }

  componentDidMount = async () => {
    await this.props.initializeUser()
  }

  userByUsername = (usernameToFind) => {
    return this.props.userbase.find(user => user.username = usernameToFind)
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NotificationView />
            <Menu />
            <Route exact path="/bloglist" render={() => <BlogList />} />
            {this.props.user !== null && <Route path="/create" render={() => <NewBlogForm />} />}
            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:username" render={({match}) => <SingleUserView usernameToView={match.params.username}/>} />
            <Route exact path="/bloglist/:id" render={({match}) => <SingleBlogView blogToView={match.params.id}/>} />
          </div>
        </Router>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    userbase: state.userbase,
  }
}

export default connect(
  mapStateToProps,
  { initializeData, initializeUser, initializeUserbase }
)(App)

