import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, UserData } from '@/types/user';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Conversation = ({ conversation, currentUser }: { conversation: any; currentUser: User | null }) => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const friendId = conversation.members.find((m: string) => m !== currentUser?.userId);

        const getUser = async () => {
            try {
                const { data } = await axios.get(`/api/users/${friendId}`);
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className='flex items-center p-2 cursor-pointer mt-5 hover:bg-secondary rounded-full'>
            <Avatar>
                <AvatarImage src={user?.imageUrl} alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
                <span className='font-bold ml-5'>{user?.username}</span>
                <span className='font-light ml-5'>{user?.fullName}</span>
            </div>
        </div>
    );
};

export default Conversation;
