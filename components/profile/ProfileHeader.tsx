import React from 'react';
import UserImage from '@/components/profile/UserImage';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import EditProfile from '@/components/profile/EditProfile';

type ProfileHeaderProps = {
    imageUrl: string;
    username: string;
    bio: string;
    posts: string[];
    following: string[];
    followers: string[];
};

const ProfileHeader = ({ username, imageUrl, bio, posts, followers, following }: ProfileHeaderProps) => {
    return (
        <div className='flex p-4 shadow-md'>
            <div className='flex items-center'>
                <UserImage username={username} imageUrl={imageUrl} />
            </div>

            <div className='flex flex-col ml-20 gap-5 mt-6'>
                <div className='flex flex-col md:flex-row gap-5 items-center'>
                    <h1 className='text-2xl font-bold mb-2 md:mb-0'>{username}</h1>
                    <EditProfile />

                    <Button variant={'secondary'}>
                        <Settings />
                    </Button>
                </div>

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
