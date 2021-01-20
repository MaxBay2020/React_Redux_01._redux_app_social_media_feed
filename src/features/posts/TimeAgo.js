import React from 'react'

//引入帮助我们处理事件的函数
//parseISO()函数用来将时间的字符串转换成ISO标准的时间对象
//formatDistanceToNow(date对象)函数用来计算某个时间距离此时此刻有多久
import { parseISO, formatDistanceToNow } from 'date-fns'

export const TimeAgo = ({ timestamp }) => {
    let timeAgo = ''
    if(timestamp){
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp}>
            &nbsp;<i>{timeAgo}</i>
        </span>
    )
}
