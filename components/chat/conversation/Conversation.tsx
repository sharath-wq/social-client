import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const Conversation = () => {
    return (
        <div className='flex items-center p-3 cursor-pointer mt-5 hover:bg-secondary rounded-full'>
            <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
                <span className='font-bold ml-5'>username</span>
                <span className='font-light ml-5'>full name</span>
            </div>
        </div>
    );
};

export default Conversation;
