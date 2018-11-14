import React from "react"
import { connect } from "react-redux"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom'
import { initializeUserbase } from "../components/reducers/userbaseReducer"

class UserList extends React.Component {

    componentDidMount = async () => {
        await this.props.initializeUserbase()
      }

    render() {
        return (
            <div>
                        &emsp;
                <h2>Users</h2>
                <div>
                    {
                        <Table className="anekdootit">
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
                                {this.props.userbase
                                    .map(user =>
                                        <TableRow key={user.id} >
                                            <TableCell>
                                               <Link to={"/users/"+user.username}>{user.name}</Link>
                                            </TableCell>
                                            <TableCell>
                                                {user.username}
                                            </TableCell>
                                            <TableCell>
                                                {user.blogs.length}
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userbase: state.userbase
    }
}

export default connect(
    mapStateToProps,
    {initializeUserbase}
)(UserList)
