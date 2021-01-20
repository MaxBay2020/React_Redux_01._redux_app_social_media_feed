//nanoid函数用来生成随机且唯一的数，可以作为主键
import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!', user:'0' },
    { id: '2', title: 'Second Post', content: 'More text', user: '1' }
]
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        //这就是一个action creator函数：添加post
        postAdded: {
            //使用reducer字段来定义如何改变state
            reducer: ( state, action ) => {
                state.push(action.payload)
            },
            //使用prepare字段来return一个payload的格式
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId
                    }
                }
            }
        },
        //这是一个action creator：修改post
        postUpdated: ( state, action ) => {
            const { id, title, content } = action.payload
            const existingPost = state.find( post => post.id === id )

            if(existingPost){
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

//导出action creator，便于其他组件来dispatch action
export const { postAdded, postUpdated } = postsSlice.actions

//导出reducer
export default postsSlice.reducer


