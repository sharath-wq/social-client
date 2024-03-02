import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const Message = ({ own }: { own: boolean }) => {
    return (
        <div className={`flex flex-col mt-20 ${own ? 'items-end' : ''}`}>
            <div className={`flex gap-2 w-full ${own ? 'flex-row' : 'flex-row-reverse'} `}>
                <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className={`flex flex-col ${own ? 'items-start' : 'items-end'}`}>
                    <p className={`p-3 rounded-2xl ${own ? 'bg-secondary' : 'bg-transparent border'} max-w-xs`}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, corrupti.
                    </p>
                    <div className='text-sm mt-2'>{/* {format(message.createdAt)} */}1 hour ago</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
