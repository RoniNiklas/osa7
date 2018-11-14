import React from "react"
import { connect } from "react-redux"
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { notify } from "./reducers/notificationReducer"


class NotificationView extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    handleClose = e => {
        this.props.notify("", 0)
    }
    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={Boolean(this.props.notification)}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.props.notification}</span>}
                    action={
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={""}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification.notification
    }
}

export default connect(
    mapStateToProps,
    { notify }
)(NotificationView)
