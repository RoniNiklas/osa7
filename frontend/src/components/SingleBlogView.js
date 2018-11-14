import React from "react"
import { connect } from "react-redux"
import Button from '@material-ui/core/Button';
import { deleteOne, like, initializeData, comment } from "./reducers/blogReducer"
import ArrowRight from "@material-ui/icons/ArrowRightAlt"
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class SingleBlogView extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            commentText: "",
            commentAuthor: "",
        }
    }

    componentDidMount = async () => {
        if (this.props.blogs.length === 0) {
            await this.props.initializeData()
        }
    }

    handleLike = (blog) => {
        const handleLike2 = () => {
            this.props.like(blog)
        }
        return handleLike2
    }

    handleSend = (blog, comment) => {
        return async () => {
            const comment = {
                text: this.state.commentText,
                author: this.state.commentAuthor,
            }
            await this.props.comment(blog, comment)
            this.setState({
                commentText: "",
                commentAuthor: "",
            })
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        const blog = this.props.blogs.find(blog => blog.iidee === Number(this.props.blogToView))
        if (!blog) {
            return (
                <div>
                    &emsp;
                    <p>
                        A blog with this id was not found
                    </p>
                </div>
            )
        } else {
            return (
                <div>
                    &emsp;
                    <Typography variant="h4" gutterBottom>
                        "{blog.title}" by {blog.author}
                    </Typography>
                    <a href={"https://" + blog.url}>
                        <Typography variant="body1">
                            Available at {blog.url}
                        </Typography>
                    </a>
                    <Typography variant="body1">
                        {blog.likes} likes  <Button onClick={this.handleLike(blog)} aria-label="Like"> Like </Button>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Added by {blog.user.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Discussion
                    </Typography>
                    {blog.comments.map(comment => {
                        return (
                            <Typography variant="body1" key={comment.text}>
                                {comment.author || "Anon"} said: {comment.text}
                            </Typography>
                        )
                    })}
                    <Typography variant="h6" gutterBottom>
                        Add a comment
                    </Typography>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        id="standard-comment"
                                        label="Comment"
                                        value={this.state.commentText}
                                        multiline
                                        rows="2"
                                        onChange={this.handleChange("commentText")}
                                        margin="normal"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="standard-comment-author"
                                        label="Name (leave blank for Anon)"
                                        value={this.state.commentAuthor}
                                        multiline
                                        rows="2"
                                        onChange={this.handleChange("commentAuthor")}
                                        margin="normal"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button onClick={this.handleSend(blog)}>
                                        Send
                             </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>



                    <Typography variant="body1">
                        Return to the blog list &emsp;
                    <IconButton component={Link} to={"/bloglist"} aria-label="GoTo"> <ArrowRight /> </IconButton>
                    </Typography>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

export default connect(
    mapStateToProps,
    { like, deleteOne, initializeData, comment }
)(SingleBlogView)
