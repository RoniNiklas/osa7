import React from "react"
import { connect } from "react-redux"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { initializeData } from "../components/reducers/blogReducer"
import { initializeUser } from "../components/reducers/userReducer"
import { initializeUserbase } from "../components/reducers/userbaseReducer"
import blogService from "../services/blogs"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUp from "@material-ui/icons/ThumbUp"
import { deleteOne, like } from "./reducers/blogReducer"
import LinkIcon from "@material-ui/icons/Link"
import { Link } from 'react-router-dom'
import Typography from "@material-ui/core/Typography"
import Tooltip from "@material-ui/core/Tooltip"

class BlogList extends React.Component {
  state = {
    anchorEl: null
  };

  componentDidMount = async () => {
    await this.props.initializeData()
  }

  handleLike = (blog) => {
    const handleLike2 = () => {
      this.props.like(blog)
    }
    return handleLike2
  }
  handleDelete = (blog) => {
    const handleDelete2 = () => {
      const result = window.confirm('Poistetaanko ' + blog.title)
      if (result) {
        blogService.deleteByIidee(blog.iidee)
        this.props.deleteOne(blog)
      }
    }
    return handleDelete2
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  openMenu = (iidee, e) => {
    this.setState({
      [iidee]: true,
      anchorEl: e.currentTarget,
    })
  }
  handleClose = (iidee) => {
    const handleClose2 = () => {
      this.setState({ [iidee]: false });
    }
    return handleClose2
  };


  render() {
    return (
      <div>
        &emsp;
        <h2>
          Blogs
        </h2>
      <div>
        {
          <Table className="anekdootit">
            <TableHead>
              <TableRow>
                <TableCell>
                  Blog title
                    </TableCell>
                <TableCell>
                  Author
                    </TableCell>
                <TableCell>
                  Likes
                    </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.blogs
                .map(blog =>
                  <TableRow key={blog.iidee} >
                    <TableCell>
                      <Typography variant="body1" component={Link} to={"bloglist/" + blog.iidee}>
                        {blog.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {blog.author}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {blog.likes} likes
                        </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Like">
                        <IconButton onClick={this.handleLike(blog)} aria-label="Like"> <ThumbUp /> </IconButton>
                      </Tooltip>
                      <Tooltip title="Link to the blog">
                        <IconButton onClick={(e) => this.openMenu(blog.iidee, e)} aria-owns={this.state.anchorEl ? "simple-menu" : undefined} aria-label="GoTo"> <LinkIcon /> </IconButton>
                      </Tooltip>

                      {
                        this.props.user !== null && this.props.user.username === blog.user.username &&
                        <Tooltip title="Delete">
                          <IconButton onClick={this.handleDelete(blog)} aria-label="Delete"> <DeleteIcon /> </IconButton>
                        </Tooltip>
                      }
                      <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={this.state[blog.iidee] || false}
                        onClose={this.handleClose(blog.iidee)}
                      >
                        <a target="_blank" href={"https://" + blog.url}>
                          <MenuItem onClick={this.handleClose(blog.iidee)}>
                            <Typography variant="body1">{blog.url}</Typography>
                          </MenuItem>
                        </a>
                      </Menu>
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        }
      </div>
      {this.props.blogs.length === 0 && <p> There are no blogs on the list. </p>}
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { deleteOne, like, initializeData, initializeUser, initializeUserbase }
)(BlogList)
