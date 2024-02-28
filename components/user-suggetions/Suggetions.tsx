import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import axios, { AxiosError } from 'axios';
import { UserData } from '@/types/user';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/userContext';

export function Suggetions() {
    const [suggestedUsers, setSuggestedusers] = useState<UserData[]>();

    const getSuggestedUsers = async () => {
        try {
            // change this and inmpliment custom user suggetion algo
            const { data } = await axios.get(`/api/users`);
            setSuggestedusers(data);
        } catch (e) {
            const error = e as AxiosError;
        }
    };

    const { currentUser } = useUser();

    useEffect(() => {
        getSuggestedUsers();
    }, []);

    return (
        suggestedUsers &&
        suggestedUsers.length > 1 && (
            <div>
                <ScrollArea className='w-96 rounded-md border max-h-96 overflow-y-auto'>
                    <div className='p-4'>
                        <h4 className='mb-4 text-2xl font-bold leading-none'>People you may know</h4>
                        {suggestedUsers.map(
                            (user) =>
                                // Change this when changing the suggested user route
                                user.id !== currentUser!.userId && (
                                    <>
                                        <div key={user.id} className='flex gap-4'>
                                            <Avatar>
                                                <AvatarImage src={user.imageUrl} alt={user.username} />
                                                <AvatarFallback>{user.username.split('')[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className='flex flex-col'>
                                                <span className='text-base'>{user.username}</span>
                                                <span className='text-xs'>{user.fullName}</span>
                                            </div>
                                            <Button className='ml-auto' variant={'outline'}>
                                                follow
                                            </Button>
                                        </div>
                                        <Separator className='my-2' />
                                    </>
                                )
                        )}
                    </div>
                </ScrollArea>
            </div>
        )
    );
}
