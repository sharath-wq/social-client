import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import { Bookmark } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Save = ({ postId }: { postId: string }) => {
    const { currentUser } = useUser();
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        setIsSaved(currentUser?.savedPosts.includes(postId) || false);
    }, [currentUser, postId]);

    const handleLikeButtonClick = async () => {
        try {
            await axios.put(`/api/users/${isSaved ? 'unsave' : 'save'}/${postId}`);
            toast({
                description: `Post ${isSaved ? 'unsaved' : 'saved'}`,
            });
            setIsSaved((prevIsSaved) => !prevIsSaved);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button onClick={handleLikeButtonClick} variant='ghost'>
            {isSaved ? <Bookmark fill='#fff' color='#fff' /> : <Bookmark />}
        </Button>
    );
};

export default Save;
