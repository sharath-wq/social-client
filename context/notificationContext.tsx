import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { INotification } from '@/types/notifications';
import { useUser } from './userContext';

interface NotificationsContextType {
    newNotifications: INotification[];
    oldNotifications: INotification[];
    getNotifications: () => Promise<void>;
    markNotificationsAsRead: () => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType>({
    newNotifications: [],
    oldNotifications: [],
    getNotifications: async () => {},
    markNotificationsAsRead: async () => {},
});

export const useNotifications = (): NotificationsContextType => {
    return useContext(NotificationsContext);
};

export const NotificationsProvider: React.FC = ({ children }: any) => {
    const [newNotifications, setNewNotifications] = useState<INotification[]>([]);
    const [oldNotifications, setOldNotifications] = useState<INotification[]>([]);

    const { currentUser } = useUser();

    const getNotifications = async () => {
        try {
            // Fetch notifications data from your API
            const { data } = await axios.get(`/api/notifications/${currentUser && currentUser.userId}`);
            setNewNotifications(data.newNotifications);
            setOldNotifications(data.oldNotifications);
        } catch (error) {
            console.log(error);
        }
    };

    const markNotificationsAsRead = async () => {
        try {
            // Mark notifications as read on the server
            const notificationsIds = newNotifications.map((n) => n.id);
            await axios.patch(`/api/notifications/batch/update`, {
                ids: notificationsIds,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                if (currentUser?.userId) {
                    await getNotifications();
                }
            } catch (e) {
                const error = e as AxiosError;
                setOldNotifications([]);
                setNewNotifications([]);
            }
        })();
    }, [currentUser]);

    const notificationsContextValue: NotificationsContextType = {
        newNotifications,
        oldNotifications,
        getNotifications,
        markNotificationsAsRead,
    };

    return <NotificationsContext.Provider value={notificationsContextValue}>{children}</NotificationsContext.Provider>;
};
