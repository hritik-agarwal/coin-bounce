import {useEffect, useState} from 'react'
import {
  deleteBlog,
  getBlogById,
  getCommentByBlogId,
  createComment,
} from '../../api/internal'
import styles from './BlogDetail.module.css'
import {useNavigate, useParams} from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import {useSelector} from 'react-redux'
import CommentList from '../../components/CommentList/CommentList'

function BlogDetail() {
  const params = useParams()
  const navigate = useNavigate()
  const userId = useSelector(state => state.user._id)
  const username = useSelector(state => state.user.username)
  const blogId = params.id
  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState([])
  const [ownsBlog, setOwnsBlog] = useState([])
  const [newComment, setNewComment] = useState([])
  const [refresh, setRefresh] = useState(false)

  const postCommentHandler = async () => {
    const data = {
      author: userId,
      blog: blogId,
      content: newComment,
    }
    const response = await createComment(data)
    if (response.status === 200) {
      setNewComment('')
      setRefresh(!refresh)
    }
  }
  const deleteBlogHandler = async () => {
    const response = await deleteBlog(blogId)
    if (response.status === 200) {
      navigate('/blogs')
    }
  }

  const editBlogHandler = () => {
    navigate(`/blogs/update/${blogId}`)
  }

  useEffect(() => {
    const getBlogByIdCall = async () => {
      const commentResponse = await getCommentByBlogId(blogId)
      if (commentResponse.status === 200) {
        setComment(commentResponse.data.data)
      }
      const blogResponse = await getBlogById(blogId)
      if (blogResponse.status === 200) {
        setBlog(blogResponse.data.blog)
        setOwnsBlog(blogResponse.data.blog.authorUsername === username)
      }
    }
    getBlogByIdCall()
  }, [blogId, username, refresh])

  if (blog === null) {
    return <Loader text='blog' />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles.meta}>
          <p>
            @
            {blog.authorName + ' on ' + new Date(blog.createdAt).toDateString()}
          </p>
        </div>
        <div className={styles.photo}>
          <img src={blog.imagePath} alt='' />
        </div>
        <p className={styles.content}>{blog.content}</p>
        {ownsBlog && (
          <div className={styles.controls}>
            <button onClick={editBlogHandler} className={styles.edit}>
              Edit
            </button>
            <button onClick={deleteBlogHandler} className={styles.delete}>
              Delete
            </button>
          </div>
        )}
      </div>
      <div className={styles.rightSection}>
        <div className={styles.commentsWrapper}>
          <CommentList comment={comment} />
          <div className={styles.postComment}>
            <input
              type='text'
              className={styles.input}
              placeholder='comment goes here'
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button
              className={styles.postCommentButton}
              onClick={postCommentHandler}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BlogDetail
