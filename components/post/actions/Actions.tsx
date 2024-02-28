import React, { Dispatch, SetStateAction } from 'react';
import Like from './like/Like';
import Comment from './comment/Comment';
import Share from './share/Share';
import Save from './save/Save';
import { MessageCircle } from 'lucide-react';

const Actions = ({
    id,
    likes,
    setLikeCount,
    setCommentCount,
}: {
    id: string;
    likes: string[];
    setLikeCount: Dispatch<SetStateAction<number>>;
    setCommentCount: Dispatch<SetStateAction<number>>;
}) => {
    return (
        <div className='flex justify-between w-full'>
            <div>
                <Like setLikeCount={setLikeCount} id={id} likes={likes} />
                <Comment setCommentCount={setCommentCount} postId={id} />
                <Share />
            </div>
            <div>
                <Save postId={id} />
            </div>
        </div>
    );
};

export default Actions;
