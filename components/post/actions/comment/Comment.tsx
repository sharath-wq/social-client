import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import React from 'react';

const Comment = () => {
    return (
        <Button variant={'ghost'}>
            <MessageCircle />
        </Button>
    );
};

export default Comment;
