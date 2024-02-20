import React from 'react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import useRequest from '@/hooks/useRequest';
import { toast } from '../ui/use-toast';
import Link from 'next/link';

const SinglePost = ({ imageUrl, id, fetchUserPosts }: { imageUrl: string; id: string; fetchUserPosts: () => void }) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        doRequest();
    };

    const { doRequest, errors } = useRequest({
        url: `/api/posts/${id}`,
        method: 'delete',
        body: {},
        onSuccess: () => {
            toast({
                description: 'Post Deleted',
            });
            fetchUserPosts();
        },
    });

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className='p-4 rounded-md'>
                    <img src={imageUrl} alt='Post' className='w-full h-60 object-contain mb-4 rounded-md' />
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className='w-64'>
                <ContextMenuItem inset>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <span onClick={(e) => e.stopPropagation()} className='text-red-500'>
                                Delete
                            </span>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your post.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </ContextMenuItem>
                <ContextMenuItem inset>Share</ContextMenuItem>
                <ContextMenuItem inset>
                    <Link href={`/post/${id}`}>Edit</Link>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default SinglePost;
