import styles from './CommentList.module.css'
import Comment from '../Comment/Comment'

function CommentList({comment}) {
  return (
    <div className={styles.commentListWrapper}>
      <div className={styles.commentList}>
        {comment.length === 0 ? (
          <div className={styles.noComment}>No comments posted!</div>
        ) : (
          <>
            {comment.map(item => (
              <Comment key={item._id} comment={item} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
export default CommentList
