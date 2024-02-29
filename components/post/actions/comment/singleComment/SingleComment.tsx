import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { useUser } from '@/context/userContext';
import { SingleCommentProps } from '@/types/comment';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Label } from '@radix-ui/react-dropdown-menu';
import axios from 'axios';
import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import TimeAgo from 'react-timeago';

const SingleComment = ({ author, content, createdAt, id, likes, postId, getComments }: SingleCommentProps) => {
    const timeDifference: number = Date.now() - new Date(createdAt).getTime();

    let timeAgo: string | React.ReactNode;
    if (timeDifference < 60000) {
        timeAgo = 'Just now';
    } else {
        timeAgo = <TimeAgo date={createdAt} />;
    }

    const { currentUser } = useUser();
    const userId = currentUser?.userId;

    const [isLiked, setIsLiked] = useState<boolean>(userId ? likes.includes(userId) : false);
    const [likeCount, setLikeCount] = useState<number>(likes.length);

    const handleLikeButtonClick = async () => {
        try {
            if (!userId) {
                console.error('User not authenticated');
                return;
            }

            await axios.put(`/api/comments/${isLiked ? 'dislike' : 'like'}/${id}`);
            setIsLiked((prevIsLiked) => !prevIsLiked);
            setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex justify-between w-full'>
            <div className='flex gap-5'>
                <Avatar>
                    <AvatarImage src={author.imageUrl} alt='shadcn' />
                    <AvatarFallback>{author.username.split('')[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <Label className='flex items-baseline gap-1'>
                        <p className='font-bold text-base'>{author.username}</p> {content}
                    </Label>
                    <CardDescription>
                        {timeAgo} {`${likeCount} likes`}
                    </CardDescription>
                </div>
            </div>

            <Button
                className='transition-colors duration-300 ease-in-out'
                onClick={handleLikeButtonClick}
                variant={'ghost'}
            >
                {isLiked ? <Heart className='w-4 h-14' fill='#dc2626' color='#dc2626' /> : <Heart className='w-4 h-14' />}
            </Button>
        </div>
    );
};

export default SingleComment;
