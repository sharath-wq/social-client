'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import { Heart } from 'lucide-react';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

const Like = ({
    id,
    likes,
    setLikeCount,
}: {
    id: string;
    likes: string[];
    setLikeCount: Dispatch<SetStateAction<number>>;
}) => {
    const { currentUser } = useUser();
    const [isLiked, setIsLiked] = useState<Boolean>(likes.includes(currentUser!.userId));

    const handleLikeButtonClick = async () => {
        try {
            await axios.patch(`/api/posts/${isLiked ? 'dislike' : 'like'}/${id}`);
            setIsLiked((prevIsLiked) => !prevIsLiked);
            setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button className='transition-colors duration-300 ease-in-out' onClick={handleLikeButtonClick} variant={'ghost'}>
            {isLiked ? <Heart fill='#dc2626' color='#dc2626' /> : <Heart />}
        </Button>
    );
};

export default Like;
