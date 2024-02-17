import ProfileHeader from '@/components/profile/ProfileHeader';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const ProfilePage = () => {
    const user = {
        username: 'john_doe',
        avatar: 'https://example.com/avatar.jpg',
        totalPosts: 25,
        followersCount: 100,
        followingCount: 50,
        // Other user-related data
    };

    return (
        <div className='flex justify-center mt-20 h-screen '>
            <div className='w-3/4 flex flex-col gap-10'>
                <ProfileHeader />
                <Separator className='my-4' />
            </div>
        </div>
    );
};

export default ProfilePage;
