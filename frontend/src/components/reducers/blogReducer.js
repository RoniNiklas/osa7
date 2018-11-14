import blogService from "../../services/blogs"

const blogReducer = (state = [], action) => {

  switch (action.type) {
    case "UPDATE_BLOG":
      const blogToChange = state.find(blog => blog.iidee === action.data.iidee)
      blogService.update(blogToChange.iidee, blogToChange)
      return state.map(blog => blog.iidee !== action.data.iidee ? blog : blogToChange)
    case "COMMENT_BLOG":
      const blogToComment = state.find(blog => blog.iidee === action.data.iidee)
      console.log("blogtocomment", blogToComment)
      const commentedBlog = blogToComment
      commentedBlog.comments.push(action.comment)
      blogService.update(commentedBlog.iidee, commentedBlog)
      return state.map(blog => blog.iidee !== action.data.iidee ? blog : commentedBlog)
    case "ADD_NEW_BLOG":
      return [...state, action.blog]
    case "INIT_DATA":
      return action.data
    case "DELETE_BLOG":
      return state.filter(blog => blog.iidee !== action.data.iidee)
    default:
      return state
  }
}

export const createNew = (blogToUpload) => {
  return async (dispatch) => {
    const newBlog = await blogService.addNew(blogToUpload)
    dispatch({ type: "ADD_NEW_BLOG", blog: newBlog })
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    blog.likes = blog.likes + 1
    dispatch({ type: "UPDATE_BLOG", data: blog })
  }
}

export const comment = (blog, comment) => {
  return async (dispatch) => {
    dispatch({ type: "COMMENT_BLOG", data: blog, comment: comment })
    dispatch({ type: "NOTIFY", data: "Comment added"})
    setTimeout(() => {
      dispatch({ type: "NOTIFY", data: "" })
    }, 5000)
  }
}

export const deleteOne = (blog) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_BLOG", data: blog })
  }
}

export const initializeData = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({ type: "INIT_DATA", data: blogs })
  }
}

export default blogReducer
