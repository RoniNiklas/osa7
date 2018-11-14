import React from "react"
import { connect } from "react-redux"
import TextField from '@material-ui/core/TextField';
import { createNew } from "./reducers/blogReducer"
import { notify } from "./reducers/notificationReducer"
import Button from "@material-ui/core/Button"

class NewBlogForm extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            author: "",
            title: "",
            url: "",
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        await this.props.createNew({
            title: this.state.title,
            author: this.state.author,
            url: this.state.url,
            votes: 0
        })
        this.props.notify("You have added \"" + this.state.title + "\" by " + this.state.author, 5000)
        this.setState({
            author: "",
            title: "",
            url: "",
        })
    }



    render() {
        return (
            <div>
                <div>
                &emsp;
                    <h2>Post a new blog</h2>
                    <TextField
                        id="dote"
                        label="Blog title"
                        className="emt"
                        multiline
                        rows="2"
                        value={this.state.title}
                        onChange={this.handleChange("title")}
                        margin="normal"
                    />
                    <TextField
                        id="author"
                        label="Author"
                        className="emt"
                        multiline
                        rows="2"
                        value={this.state.author}
                        onChange={this.handleChange("author")}
                        margin="normal"
                    />
                    <TextField
                        id="linkki"
                        label="Link"
                        className="emt"
                        multiline
                        rows="2"
                        value={this.state.url}
                        onChange={this.handleChange("url")}
                        margin="normal"
                    />
                </div>
                <div>
                    <Button onClick={this.handleSubmit}> Create </Button>
                </div>
            </div>
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
    { createNew, notify }
)(NewBlogForm)
