import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bookmark, Heart, MessageCircle, Save, Send } from 'lucide-react';
import React from 'react';
import AddCommentForm from './addCommentForm/AddCommentForm';

const Comment = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'ghost'}>
                    <MessageCircle />
                </Button>
            </DialogTrigger>
            <DialogContent className='h-[90%] w-full max-w-screen-xl flex'>
                <div className='w-1/2'>
                    <img
                        src='https://res.cloudinary.com/djnljzyhb/image/upload/v1709023291/posts/dnbhsnyv8zympm9lfcnj.jpg'
                        alt='Post Image'
                        className='w-full h-full object-cover'
                    />
                </div>

                <div className='w-1/2'>
                    <div className='flex flex-col h-full'>
                        {/* First div */}
                        <div className='flex items-center gap-2 p-4 h-1/20'>
                            <Avatar>
                                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className='text-lg font-bold'>Username</p>
                        </div>

                        <Separator />

                        {/* Center div */}
                        <div className='p-4 flex justify-between flex-grow h-9/20'>
                            <div className='flex  mb-2'>
                                <div className='flex gap-4'>
                                    <Avatar>
                                        <AvatarImage src='https://github.com/shadcn.png' alt='shadcn' />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Label className='flex items-baseline gap-1'>
                                            <p className='font-bold text-base'>Sharath</p> This is a test comment
                                        </Label>
                                        <CardDescription>{`1d   1 like`}</CardDescription>
                                    </div>
                                </div>
                            </div>
                            <Heart className='w-4 h-14' />
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
                            <span className='text-lg font-semibold mt-3'>544 Likes</span>
                            <span className='text-sm text-muted-foreground mb-3'>3 days ago</span>
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
