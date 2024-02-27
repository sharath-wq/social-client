'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Bookmark, Heart, MessageCircle, Save, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AddCommentForm from './addCommentForm/AddCommentForm';
import { PostProps } from '@/types/post';
import axios, { AxiosError } from 'axios';
import { CommentResponse } from '@/types/comment';
import SingleComment from './singleComment/SingleComment';
import TimeAgo from 'react-timeago';

const Comment = ({ postId }: { postId: string }) => {
    const [post, setPost] = useState<PostProps>();
    const [comments, setComments] = useState<CommentResponse[]>();

    const getPosts = async () => {
        try {
            const { data } = await axios.get(`/api/posts/${postId}`);
            setPost(data);
        } catch (e) {
            const error = e as AxiosError;
        }
    };

    const getComments = async () => {
        try {
            const { data } = await axios.get(`/api/comments/${postId}`);
            setComments(data);
        } catch (e) {
            const error = e as AxiosError;
        }
    };

    useEffect(() => {
        getPosts();
        getComments();
    }, []);

    if (!post) {
        return <div>Loading...</div>;
    }

    const timeDifference: number = Date.now() - new Date(post.createdAt).getTime();

    let timeAgo: string | React.ReactNode;
    if (timeDifference < 60000) {
        timeAgo = 'Just now';
    } else {
        timeAgo = <TimeAgo date={post!.createdAt} />;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'ghost'}>
                    <MessageCircle />
                </Button>
            </DialogTrigger>
            <DialogContent className='h-[90%] w-full max-w-screen-xl flex'>
                <div className='w-1/2'>
                    <img src={post?.imageUrls[0]} alt='Post Image' className='w-full h-full object-cover' />
                </div>

                <div className='w-1/2'>
                    <div className='flex flex-col h-full'>
                        {/* First div */}
                        <div className='flex items-center gap-2 p-4 h-1/20'>
                            <Avatar>
                                <AvatarImage src={post?.author.imageUrl} alt={post?.author.username} />
                                <AvatarFallback>{post?.author.username.split('')[0]}</AvatarFallback>
                            </Avatar>
                            <p className='text-lg font-bold'>{post?.author.username}</p>
                        </div>

                        <Separator />

                        {/* Center div */}
                        <div className='p-4 flex justify-between flex-grow h-9/20'>
                            <div className='flex flex-col w-full mb-2'>
                                {comments && comments.length
                                    ? comments.map((comment: CommentResponse) => <SingleComment {...comment} />)
                                    : 'No comments'}
                            </div>
                        </div>

                        <Separator />

                        {/* Last div */}
                        <div className='p-4 flex flex-col items-start justify-between h-1/20'>
                            <div className='flex space-x-4 w-full'>
                                <div className='flex justify-between w-full'>
                                    <div className='flex gap-5'>
                                        <Heart />
                                        <MessageCircle />
                                        <Send />
                                    </div>
                                    <div>
                                        <Bookmark />
                                    </div>
                                </div>
                            </div>
                            <span className='text-lg font-semibold mt-3'>{post?.likes.length} Likes</span>
                            <span className='text-sm text-muted-foreground mb-3'>{timeAgo}</span>
                            <Separator />
                            <div className='w-full mt-4'>
                                <AddCommentForm />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Comment;
