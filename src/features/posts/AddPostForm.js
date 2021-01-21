import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

// import { postAdded } from './postsSlice'
import { addNewPost } from './postsSlice'

export const AddPostForm = () => {
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')
    const [ userId, setUserId ] = useState('')
    const [ addRequestStatus, setAddRequestStatus ] = useState('idle')

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const dispatch = useDispatch()

    const users = useSelector( state => state.users )

    // //点击发布按钮触发的事件
    // const onSavePostClicked = () => {
    //     if(title && content){
    //         //postAdded是一个action creator，我们需要传进去一个参数，这个参数将会作为action.payload的值
    //         dispatch(postAdded(title, content, userId))
    //         setTitle('')
    //         setContent('')
    //     }
    // }

    const onSavePostClicked = async () => {
        if(canSave){
            try {
                setAddRequestStatus('pending')
                const resultAction = await dispatch(
                    addNewPost({ title, content, user: userId })
                )
                unwrapResult( resultAction )
                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error('Failed to save the post: ',err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map( user => (
        <option value={user.id} key={user.id}>
            { user.name }
        </option>
    ) )

    // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus==='idle'

    return (
        <section>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id={'postTitle'}
                    name={'postTitle'}
                    value={ title }
                    onChange={ onTitleChanged }
                    placeholder={'Post title here'}
                />

                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged} >
                    <option value=""></option>
                    { usersOptions }
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea
                    name="postContent"
                    id="postContent"
                    placeholder={'What do you want to share?'}
                    value={ content }
                    onChange={ onContentChanged }
                    cols="30"
                    rows="10">
                </textarea>

                <button type={'button'} onClick={onSavePostClicked} disabled={!canSave} >
                    Save Post
                </button>

            </form>
        </section>
    )
}
