'use client';

import Notification from '@/components/notifications/notification/Notification';
import { Separator } from '@/components/ui/separator';
import { Suggetions } from '@/components/user-suggetions/Suggetions';
import React from 'react';

const Notifications = () => {
    return (
        <div className='w-full flex flex-col gap-10 sm:flex-row'>
            <div className='w-full sm:w-1/3 flex flex-col gap-10 mt-10'>
                <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                    New Notifications
                </h2>
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Separator />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
            </div>
        </div>
    );
};

export default Notifications;
