import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import React from 'react';

const ChatOnline = () => {
    return (
        <div className='chatOnline'>
            <div className='flex items-center font-medium cursor-pointer mt-3'>
                <div className='relative mr-3'>
                    <Avatar>
                        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='w-4 h-4 rounded-full bg-[#ADFA1D] absolute top-[-2px] right-[-2px] border-2 border-white'></div>
                </div>

                <div className='flex flex-col'>
                    <span className='font-bold ml-5'>username</span>
                    <span className='font-light ml-5'>full name</span>
                </div>
            </div>
        </div>
    );
};

export default ChatOnline;
