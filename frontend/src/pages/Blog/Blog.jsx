import {useState, useEffect} from 'react'
import Loader from '../../components/Loader/Loader'
import {getAllBlogs} from '../../api/internal'
import styles from './Blog.module.css'
import {useNavigate} from 'react-router-dom'

function Blog() {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getAllBlogsCall = async () => {
      const response = await getAllBlogs()
      if (response.status === 200) {
        setBlogs(response.data.blogs)
      }
    }
    getAllBlogsCall()
    return () => setBlogs({})
  }, [])

  if (blogs.length === 0) {
    return <Loader text='blogs' />
  }

  return (
    <div className={styles.blogsWrapper}>
      {blogs.map(blog => (
        <div
          key={blog._id}
          className={styles.blog}
          onClick={() => {
            navigate(`/blogs/${blog._id}`)
          }}>
          <h1>{blog.title}</h1>
          <img src={blog.imagePath} alt='' />
          <p>{blog.content.slice(0, 200)}...</p>
        </div>
      ))}
    </div>
  )
}
export default Blog
