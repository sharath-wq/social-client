import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import React from 'react';

const Save = () => {
    return (
        <Button variant={'ghost'}>
            <Bookmark />
        </Button>
    );
};

export default Save;
