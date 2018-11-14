import React from "react"
import { connect } from "react-redux"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Menu from "@material-ui/core/Menu"
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { initializeUserbase } from "./reducers/userbaseReducer"

import {Link} from 'react-router-dom'

class SingleUserView extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            anchorEl: null,
        }
    }


    componentDidMount = async () => {
        if (this.props.userbase.length === 0) {
            await this.props.initializeUserbase()
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    render() {
        const user = this.props.userbase.find(user => user.username === this.props.usernameToView)
        if (!user) {
            return null
        } else {
            return (
                <div>
                       &emsp;
                    <h2>
                        {user.name}
                    </h2>
                    <div>
                        {
                            <Table className="käyttäjä">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Name
                                    </TableCell>
                                        <TableCell>
                                            Username
                                    </TableCell>
                                        <TableCell>
                                            Blogs added
                                 </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            {user.name}
                                        </TableCell>
                                        <TableCell>
                                            {user.username}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                                                onClick={this.handleClick}
                                            > {user.blogs.length}</Button>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={this.state.anchorEl}
                                                open={Boolean(this.state.anchorEl)}
                                                onClose={this.handleClose}
                                            >
                                                {user.blogs.map(blog => {
                                                    return (
                                                        <Link to={"/bloglist/" + blog.iidee} key={blog.iidee}>
                                                            <MenuItem onClick={this.handleClose} id={blog.iidee}>
                                                                <Button>
                                                                    {blog.title}
                                                                </Button>

                                                            </MenuItem>
                                                        </Link>
                                                    )
                                                })
                                                }
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        }
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userbase: state.userbase
    }
}

export default connect(
    mapStateToProps,
    { initializeUserbase }
)(SingleUserView)
