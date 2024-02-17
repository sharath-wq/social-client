import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type UserImageProps = {
    username: string;
    imageUrl: string;
};

const UserImage = ({ username, imageUrl }: UserImageProps) => {
    return (
        <Avatar className='w-full h-full'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};

export default UserImage;
