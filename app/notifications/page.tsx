'use client';

import Notification from '@/components/notifications/notification/Notification';
import { useNotifications } from '@/context/notificationContext';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Notifications = () => {
    const router = useRouter();
    const { currentUser } = useUser();

    useEffect(() => {
        if (!currentUser) {
            router.replace('/auth/login');
        } else {
            router.replace('/notifications');
        }
    }, [currentUser, router]);

    const { newNotifications, oldNotifications, markNotificationsAsRead } = useNotifications();

    useEffect(() => {
        return () => {
            markNotificationsAsRead();
        };
    }, [newNotifications]);

    return (
        <div className='w-full flex flex-col gap-10 sm:flex-row'>
            <div className='w-full sm:w-1/3 flex flex-col gap-10 mt-10'>
                <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                    New Notifications
                </h2>
                {newNotifications.length > 0 ? (
                    newNotifications.map((n) => <Notification notification={n} />)
                ) : (
                    <p className='text-sm text-muted-foreground'>No new notifications.</p>
                )}
                <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                    Old Notifications
                </h2>
                {oldNotifications.length > 0 ? (
                    oldNotifications.map((n) => <Notification notification={n} />)
                ) : (
                    <p className='text-sm text-muted-foreground'>No old notifications.</p>
                )}
            </div>
        </div>
    );
};

export default Notifications;
