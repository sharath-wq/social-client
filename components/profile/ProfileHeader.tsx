import React, { useEffect, useState } from 'react';
import UserImage from '@/components/profile/UserImage';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import EditProfile from '@/components/profile/EditProfile';
import axios, { AxiosError } from 'axios';
import { useUser } from '@/context/userContext';

type ProfileHeaderProps = {
    imageUrl: string;
    username: string;
};

const ProfileHeader = ({ username, imageUrl }: ProfileHeaderProps) => {
    return (
        <div className='flex flex-col md:flex-row p-4 shadow-md'>
            <div className='flex items-center md:w-1/3'>
                <UserImage username={username} imageUrl={imageUrl} />
            </div>

            <div className='flex flex-col md:ml-20 gap-5 mt-4'>
                <div className='flex flex-col md:flex-row gap-5 items-center'>
                    <h1 className='text-2xl font-bold mb-2 md:mb-0'>{username}</h1>
                    <EditProfile />

                    <Button variant={'secondary'}>
                        <Settings />
                    </Button>
                </div>

                <div className='flex flex-wrap md:flex-nowrap gap-4'>
                    <div className='text-center mb-2 md:mb-0'>
                        <span className='block font-bold text-lg'>123</span>
                        <span className=''>Posts</span>
                    </div>
                    <div className='text-center mb-2 md:mb-0'>
                        <span className='block font-bold text-lg'>456</span>
                        <span className=''>Followers</span>
                    </div>
                    <div className='text-center'>
                        <span className='block font-bold text-lg'>789</span>
                        <span className=''>Following</span>
                    </div>
                </div>

                <div className=''>
                    <p className='text-wrap'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic nostrum quasi explicabo rem, nam quos
                        labore optio possimus facilis non.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
