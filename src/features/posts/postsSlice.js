//nanoid函数用来生成随机且唯一的数，可以作为主键
import { createSlice, nanoid } from '@reduxjs/toolkit'
//sub(date时间, 相差时间)函数是用来计算date时间减去相差时间之后的时间
import { sub } from 'date-fns'

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!', user:'0', date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
        } },
    { id: '2', title: 'Second Post', content: 'More text', user: '1', date: sub(new Date(), {minutes: 5}).toISOString(), reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
        } }
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
                        user: userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
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
        },
        reactionAdded: ( state, action ) => {
            const { postId, reaction } = action.payload
            const existingPost = state.find( post => post.id===postId )
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

//导出action creator，便于其他组件来dispatch action
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

//导出reducer
export default postsSlice.reducer


