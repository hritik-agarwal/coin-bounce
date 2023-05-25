import styles from './SubmitBlog.module.css'
import {submitBlogs} from '../../api/internal'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import TextInput from '../../components/TextInput/TextInput'

function SubmitBlog() {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')

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
    const data = {
      author,
      title,
      content,
      image,
    }
    const response = await submitBlogs(data)
    if (response.status === 201) {
      navigate('/')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Create a blog</div>
      <TextInput
        type='text'
        name='title'
        placeholder='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
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
        {image !== '' && <img src={image} width={100} height={100} />}
      </div>
      <button
        className={styles.submit}
        onClick={handleSubmit}
        disabled={!title || !content || !image}>
        Submit
      </button>
    </div>
  )
}
export default SubmitBlog
