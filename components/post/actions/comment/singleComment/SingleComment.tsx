import { Avatar } from '@/components/ui/avatar';
import { CardDescription } from '@/components/ui/card';
import { CommentResponse } from '@/types/comment';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Heart } from 'lucide-react';
import React from 'react';
import TimeAgo from 'react-timeago';

const SingleComment = ({ author, content, createdAt, id, likes, postId }: CommentResponse) => {
    const timeDifference: number = Date.now() - new Date(createdAt).getTime();

    let timeAgo: string | React.ReactNode;
    if (timeDifference < 60000) {
        timeAgo = 'Just now';
    } else {
        timeAgo = <TimeAgo date={createdAt} />;
    }

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
                        {timeAgo} {`${likes.length} likes`}
                    </CardDescription>
                </div>
            </div>
            <Heart className='w-4 h-14' />
        </div>
    );
};

export default SingleComment;
