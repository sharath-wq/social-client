'use client';

import ProfileHeader from '@/components/profile/ProfileHeader';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import UserPosts from '@/components/profile/UserPosts';
import axios, { AxiosError } from 'axios';
import { useUser } from '@/context/userContext';
import ProfileHeaderSkelton from '@/components/Skeltons/profile/ProfileHeaderSkelton';
import PostsGridSkeleton from '@/components/Skeltons/profile/PostsGridSkelton';

type UserData = {
    createdAt: string;
    email: string;
    fullName: string;
    id: string;
    imageUrl: string;
    isAdmin: boolean;
    username: string;
};

type UserPostData = {
    id: string;
    author: {
        userId: string;
        username: string;
        imageUrl: string;
    };
    caption: string;
    tags: string[];
    imageUrls: string[];
    likes: string[];
    comments: string[];
    createdAt: Date;
};

const ProfilePage = () => {
    const [userData, setUserData] = useState<UserData>();
    const [userPostsData, setuserPostsData] = useState<UserPostData[] | []>([]);

    const { currentUser } = useUser();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/api/users/${currentUser!.userId}`);
                setUserData(data);
            } catch (e) {
                const error = e as AxiosError;
            }
        })();

        (async () => {
            try {
                const { data } = await axios.get(`/api/posts/user/${currentUser!.userId}/`);
                setuserPostsData(data);
            } catch (e) {
                const error = e as AxiosError;
            }
        })();
    }, [currentUser]);

    return (
        <div className='flex justify-center mt-20 h-screen '>
            <div className='w-3/4 flex flex-col gap-10'>
                {userData ? <ProfileHeader {...userData} /> : <ProfileHeaderSkelton />}
                <Separator className='my-4' />
                {userPostsData.length ? <UserPosts posts={userPostsData} /> : <PostsGridSkeleton />}
            </div>
        </div>
    );
};

export default ProfilePage;
