import React from "react"
import { connect } from "react-redux"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { login } from "./reducers/userReducer"
import { notify } from "./reducers/notificationReducer"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            username: "",
            password: "",
            open: true
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleSubmit = async (event) => {
        await this.props.login({
            username: this.state.username,
            password: this.state.password
        })
        this.props.handleClose()
    }
    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCLose}
                    aria-labelledby="loginform-title"
                >
                    <DialogTitle id="form-dialog-title">Login form</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="UN"
                            label="Username"
                            className="emt"
                            value={this.state.username}
                            onChange={this.handleChange("username")}
                            margin="normal"
                        />
                        <TextField
                            id="PW"
                            label="Password"
                            className="emt"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange("password")}
                            margin="normal"
                        />
                        <DialogActions>
                            <Button onClick={this.props.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary">
                                Login
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    { login, notify }
)(LoginForm)
