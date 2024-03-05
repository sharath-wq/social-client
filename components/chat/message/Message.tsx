import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { IMessage } from '@/types/message';
import TimeAgo from 'react-timeago';

const Message = ({ message, own }: { message: IMessage; own: boolean }) => {
    const timeDifference: number = Date.now() - new Date(message.createdAt).getTime();

    let timeAgo: string | React.ReactNode;
    if (timeDifference < 60000) {
        timeAgo = 'Just now';
    } else {
        timeAgo = <TimeAgo date={message.createdAt} />;
    }
    return (
        <div className={`flex flex-col mt-20 ${own ? 'items-end' : ''}`}>
            <div className={`flex gap-2 w-full ${own ? 'flex-row' : 'flex-row-reverse'} `}>
                <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className={`flex flex-col ${own ? 'items-start' : 'items-end'}`}>
                    <p className={`p-3 rounded-2xl ${own ? 'bg-secondary' : 'bg-transparent border'} max-w-xs`}>
                        {message.text}
                    </p>
                    <div className='text-sm mt-2'>{timeAgo}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
