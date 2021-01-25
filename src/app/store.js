import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

export default configureStore({
  reducer: { //这里设置state有哪些数据
    posts: postsReducer, // 这样state就有了state.posts字段
    users: usersReducer, // 这样state就有了state.uses字段
    notifications:notificationsReducer // 这样state就有了state.notifications字段
  }
})
