'use client';

import Notification from '@/components/notifications/notification/Notification';
import { useUser } from '@/context/userContext';
import { INotification } from '@/types/notifications';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Notifications = () => {
    const router = useRouter();
    const { currentUser } = useUser();

    const [newNotifications, setNewNotifications] = useState([]);
    const [oldNotifications, setOldNotifications] = useState([]);

    useEffect(() => {
        if (!currentUser) {
            router.replace('/auth/login');
        } else {
            router.replace('/notifications');
        }
    }, [currentUser, router]);

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const { data } = await axios.get(`/api/notifications/${currentUser && currentUser.userId}`);
                setNewNotifications(data.newNotifications);
                setOldNotifications(data.oldNotifications);
            } catch (error) {
                console.log(error);
            }
        };

        return () => {
            const updateNotification = async () => {
                try {
                    const notificationsIds = newNotifications.map((n: INotification) => n.id);
                    await axios.patch(`/api/notifications/batch/update`, {
                        ids: notificationsIds,
                    });
                } catch (error) {
                    console.log(error);
                }
            };

            updateNotification();
        };

        getNotifications();
    }, [currentUser?.userId]);

    return (
        <div className='w-full flex flex-col gap-10 sm:flex-row'>
            <div className='w-full sm:w-1/3 flex flex-col gap-10 mt-10'>
                <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                    New Notifications
                </h2>
                {newNotifications.map((n) => (
                    <Notification notification={n} />
                ))}
                <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                    Old Notifications
                </h2>
                {oldNotifications.map((n) => (
                    <Notification notification={n} />
                ))}
            </div>
        </div>
    );
};

export default Notifications;
