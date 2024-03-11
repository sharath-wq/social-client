import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardDescription, CardTitle } from '@/components/ui/card';

const Notification = () => {
    return (
        <div className='flex gap-2 justify-between'>
            <div className='flex gap-5'>
                <Avatar className='w-12 h-12'>
                    <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col justify-center'>
                    <CardTitle className='text-base font-medium '>
                        <span className='text-lg font-semibold'>sharth-wq</span> commented on you post
                    </CardTitle>
                    <CardDescription>1 hour ago</CardDescription>
                </div>
            </div>
            <div>
                <img
                    className='w-12 h-12 object-contain'
                    src='https://res.cloudinary.com/djnljzyhb/image/upload/v1709271135/posts/jhmqpdxm2slv3brevptg.jpg'
                    alt=''
                />
            </div>
        </div>
    );
};

export default Notification;
