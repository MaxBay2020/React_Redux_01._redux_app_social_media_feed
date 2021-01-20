import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postUpdated } from './postsSlice'

export const EditPostForm = ({ match }) => {
    const { postId } = match.params

    const post = useSelector( state => (
        state.posts.find( post => post.id === postId )
    ) )

    const [ title, setTitle ] = useState(post.title)
    const [ content, setContent ] = useState(post.content)

    const dispatch = useDispatch()
    const history = useHistory()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    //dispatch action
    const onSavePostClicked = () => {
        if(title && content){
            dispatch(postUpdated({
                id: post.id,
                title,
                content
            }))

            //重定向到本post
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id={'postTitle'}
                    name={'postTitle'}
                    placeholder={'What is on your mind?'}
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Post Content:</label>
                <input
                    type="text"
                    id={'postContent'}
                    name={'postContent'}
                    placeholder={'Describe what is your thought here'}
                    value={content}
                    onChange={onContentChanged}
                />
            </form>
            <button type={'button'} onClick={onSavePostClicked} >
                Save Post
            </button>


        </section>
    )

}
