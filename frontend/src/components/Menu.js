import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core"
import Typography from '@material-ui/core/Typography'
import { clearUser, login } from "./reducers/userReducer"
import LoginForm from "./LoginForm"

const styles = {
  rightyTighty: {
    flexGrow: 1,
  },
};

class Menu extends React.Component {

  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  logout = async (event) => {
    event.preventDefault()
    this.props.clearUser()
  }

  render() {
    const { classes } = this.props
    return (
      < div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Button component={NavLink} to="/bloglist" color="inherit" aria-label="Bloglist">List of blogs</Button>
            <Button component={NavLink} to="/users" color="inherit" aria-label="users">List of users</Button>
            {this.props.user !== null && <Button component={NavLink} to="/create" color="inherit" aria-label="New"> Post a new blog</Button>}
            <Typography className={classes.rightyTighty}></Typography>
            {this.props.user !== null && <Button color="inherit" onClick={this.logout}> Log out </Button>}
            {this.props.user === null && <Button color="inherit" onClick={this.handleClickOpen}> Log in </Button>}
          </Toolbar>
        </AppBar>
        {this.state.open === true && <LoginForm handleClose={this.handleClose}/>}
      </div >
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withStyles(styles)(connect(
  mapStateToProps,
  { clearUser, login }
)(Menu))

