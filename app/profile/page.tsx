'use client';

import ProfileHeader from '@/components/profile/ProfileHeader';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import UserPosts from '@/components/profile/UserPosts';
import axios, { AxiosError } from 'axios';
import { useUser } from '@/context/userContext';
import ProfileHeaderSkelton from '@/components/Skeltons/profile/ProfileHeaderSkelton';
import PostsGridSkeleton from '@/components/Skeltons/profile/PostsGridSkelton';
import { UserData } from '@/types/user';
import { UserPostData } from '@/types/post';

const ProfilePage = () => {
    const [userData, setUserData] = useState<UserData>();
    const [userPostsData, setuserPostsData] = useState<UserPostData[] | null>(null);

    const { currentUser } = useUser();

    const fetchUserPosts = async () => {
        try {
            const { data } = await axios.get(`/api/posts/user/${currentUser!.userId}/`);
            setuserPostsData(data);
        } catch (e) {
            const error = e as AxiosError;
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/api/users/${currentUser!.userId}`);
                setUserData(data);
            } catch (e) {
                const error = e as AxiosError;
            }
        })();

        fetchUserPosts();
    }, [currentUser]);

    return (
        <div className='flex justify-center mt-20 h-screen '>
            <div className='w-3/4 flex flex-col gap-10'>
                {userData ? <ProfileHeader {...userData} /> : <ProfileHeaderSkelton />}
                <Separator className='my-4' />
                {userPostsData ? (
                    <UserPosts fetchUserPosts={fetchUserPosts} posts={userPostsData} />
                ) : (
                    <PostsGridSkeleton />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
