import React from 'react';
import UserImage from './UserImage';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { Settings } from 'lucide-react';
import EditProfile from './EditProfile';

const ProfileHeader = () => {
    return (
        <div className='flex p-4 shadow-md'>
            <div className='flex items-center w-1/3'>
                <UserImage username='shadcn' imageUrl='black' />
            </div>

            <div className='flex ml-20 gap-5 mt-4 flex-col'>
                <div className=' flex gap-5 items-center'>
                    <h1 className='text-2xl font-bold'>Username</h1>
                    <EditProfile />

                    <Button variant={'secondary'}>
                        <Settings />
                    </Button>
                </div>

                <div className='  flex gap-4'>
                    <div className='text-center'>
                        <span className='block font-bold text-lg'>123</span>
                        <span className=''>Posts</span>
                    </div>
                    <div className='text-center'>
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
