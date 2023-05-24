import styles from './BlogUpdate.module.css'
import {getBlogById, updateBlogs} from '../../api/internal'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import TextInput from '../../components/TextInput/TextInput'
import Loader from '../../components/Loader/Loader'

function BlogUpdate() {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')

  const blogId = useParams().id
  const navigate = useNavigate()

  const author = useSelector(state => state.user._id)

  const getPhoto = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const handleSubmit = async () => {
    let data = {
      author,
      title,
      content,
      blogId,
    }
    if (!image.includes('http')) data = {...data, image}
    const response = await updateBlogs(data)
    if (response.status === 200) {
      navigate('/')
    }
  }

  useEffect(() => {
    const getBlogByIdCall = async () => {
      const blogResponse = await getBlogById(blogId)
      if (blogResponse.status === 200) {
        const blog = blogResponse.data.blog
        setTitle(blog.title)
        setContent(blog.content)
        setImage(blog.imagePath)
      }
    }
    getBlogByIdCall()
  }, [blogId])

  if (title === '') {
    return <Loader title='blog' />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Update blog</div>
      <TextInput
        type='text'
        name='title'
        placeholder='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{width: '60%'}}
      />
      <textarea
        type='text'
        name='content'
        placeholder='your content goes here...'
        value={content}
        onChange={e => setContent(e.target.value)}
        className={styles.content}
      />
      <div className={styles.photoPrompt}>
        <p>Choose a photo</p>
        <input
          type='file'
          name='photo'
          id='photo'
          accept='image/jpg, image/jpeg, image/png'
          onChange={getPhoto}
        />
        <img alt='blog' src={image} width={100} height={100} />
      </div>
      <button className={styles.update} onClick={handleSubmit}>
        Update
      </button>
    </div>
  )
}
export default BlogUpdate
