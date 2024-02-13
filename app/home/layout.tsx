'use client';

import Sidebar from '@/components/sidebar/Sidebar';
import { ModeToggle } from '@/components/ui/modeToggle';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        (async () => {
            const { posts, error }: any = await getPosts();
        })();
    }, []);

    return (
        <div className='relative'>
            <div className='fixed top-5 right-5 sm:block hidden'>
                <ModeToggle />
            </div>
            <div className='float-left w-64 sm:w-80'>
                <Sidebar />
            </div>
            <div className='ml-4 p-4 sm:ml-80'>{children}</div>
        </div>
    );
}

async function getPosts() {
    try {
        const { data } = await axios.get('/api/posts');

        return {
            posts: data,
            error: null,
        };
    } catch (e) {
        const error = e as AxiosError;

        return {
            currentUser: null,
            error,
        };
    }
}
