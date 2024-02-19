import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type UserImageProps = {
    username: string;
    imageUrl: string;
};

const UserImage = ({ username, imageUrl }: UserImageProps) => {
    return (
        <div className='w-52 h-52'>
            <Avatar className='w-full h-full'>
                <AvatarImage src={imageUrl} alt='@shadcn' className='w-full h-full object-cover' />
                <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
        </div>
    );
};

export default UserImage;
