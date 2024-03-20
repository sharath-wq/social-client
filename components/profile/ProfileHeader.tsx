import React, { useEffect, useState } from 'react';
import UserImage from '@/components/profile/UserImage';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import EditProfile from '@/components/profile/EditProfile';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import { toast } from '../ui/use-toast';

type ProfileHeaderProps = {
    id: string;
    own: boolean;
    imageUrl: string;
    username: string;
    fullName: string;
    bio: string;
    posts: string[];
    following: string[];
    followers: string[];
    email: string;
    handleNotification?: (senderId: string, receiverId: string) => void;
};

const ProfileHeader = ({
    own,
    id,
    username,
    imageUrl,
    fullName,
    bio,
    posts,
    followers,
    following,
    email,
    handleNotification,
}: ProfileHeaderProps) => {
    const editUserData = {
        username,
        bio,
        fullName,
        email,
    };

    const { currentUser } = useUser();
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        setIsFollowing((currentUser && currentUser.following?.includes(id)) || false);
    }, [currentUser, id]);

    const handleClick = async () => {
        try {
            await axios.put(`/api/users/${isFollowing ? 'unfollow' : 'follow'}/${id}`);
            toast({
                description: `${isFollowing ? 'unfollowed' : 'followed'}`,
            });

            if (!isFollowing) {
                handleNotification && handleNotification(currentUser!.userId, id);
            }

            setIsFollowing((prev) => !prev);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex p-4'>
            <div className='flex items-center'>
                <UserImage own={own} username={username} imageUrl={imageUrl} />
            </div>

            <div className='flex flex-col ml-20 gap-5 mt-6'>
                <div className='flex flex-col md:flex-row gap-5 items-center'>
                    <h1 className='text-2xl font-bold mb-2 md:mb-0'>{username}</h1>
                    {own && <EditProfile {...editUserData} />}

                    {own ? (
                        <Button variant={'secondary'}>
                            <Settings />
                        </Button>
                    ) : (
                        <Button onClick={handleClick} className='ml-auto' variant={'secondary'}>
                            {isFollowing ? 'unfollow' : 'follow'}
                        </Button>
                    )}
                </div>
                <span className='text-md font-normal mb-2 md:mb-0'>{fullName}</span>

                <div className='flex flex-wrap md:flex-nowrap gap-4'>
                    <div className='text-center mb-2 md:mb-0'>
                        <span className='block font-bold text-lg'>{posts?.length}</span>
                        <span className=''>Posts</span>
                    </div>
                    <div className='text-center mb-2 md:mb-0'>
                        <span className='block font-bold text-lg'>{followers?.length}</span>
                        <span className=''>Followers</span>
                    </div>
                    <div className='text-center'>
                        <span className='block font-bold text-lg'>{following?.length}</span>
                        <span className=''>Following</span>
                    </div>
                </div>

                <div className=''>
                    <p className='text-wrap'>{bio}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
