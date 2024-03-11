import React from 'react'
import moment from "moment"

const ChatLeft = (props: any) => {

    const currentTime = moment();
    const givenTime = moment(props.time);
    const hoursDifference = currentTime.diff(givenTime, 'hours');
    const isWithin48Hours = hoursDifference <= 24
    const formattedTime = isWithin48Hours ? givenTime.fromNow() : givenTime.format('MMM DD, YYYY');

    return (
        <>
            <div className="chat chat-start text-gray-200">
                <div className="chat-bubble flex flex-col gap-2 rounded-2xl bg-[#006655]">
                    <p className='text-sm w-full text-left break-all'>{props?.message}</p>
                    <p className='text-[0.7rem]'>{formattedTime}</p>
                </div>
            </div>
        </>
    )
}

export default ChatLeft