'use client';

import { z } from 'zod';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import useRequest from '@/hooks/useRequest';
import { toast } from '@/components/ui/use-toast';
import { ButtonLoading } from '@/components/button/LoadingButton';

import { zodResolver } from '@hookform/resolvers/zod';

import ChatOnline from '@/components/chat/chatOnline/ChatOnline';
import Conversation from '@/components/chat/conversation/Conversation';
import Message from '@/components/chat/message/Message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import React, { MouseEvent, Ref, useEffect, useRef, useState } from 'react';
import noMessagesBg from '@/public/no-message.svg';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CurrentChat, IMessage } from '@/types/message';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { MessageValidation } from '@/lib/validation';

const ChatPage = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);
    const [messages, setMessages] = useState<IMessage[] | []>([]);
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const { currentUser } = useUser();
    const scrollRef: any = useRef();

    // 1. Define your form.
    const form = useForm<z.infer<typeof MessageValidation>>({
        resolver: zodResolver(MessageValidation),
        defaultValues: {
            text: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof MessageValidation>) {
        const sendMessge = async () => {
            const message = {
                sender: currentUser?.userId,
                text: values.text,
                conversationId: currentChat?.id,
            };

            const receiverId = currentChat?.members?.find((m) => m !== currentUser?.userId);

            try {
                const { data } = await axios.post('/api/chat/message', message);
                setMessages([...messages, data]);
                form.setValue('text', '');
            } catch (error) {
                console.log(error);
            }
        };

        sendMessge();
    }

    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.replace('/auth/login');
            return;
        }
    }, [currentUser, router]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const { data } = await axios.get(`/api/chat/conversation/${currentUser && currentUser.userId}`);
                setConversations(data);
            } catch (error) {
                console.log(error);
            }
        };

        getConversations();
    }, [currentUser?.userId]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const { data } = await axios.get(`/api/chat/message/${currentChat?.id}`);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='flex-[2] border-r'>
                <div className='p-3 h-full '>
                    <Input placeholder='Search for friends' />
                    <div className='h-full overflow-y-scroll no-scrollbar'>
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={currentUser} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex-[5.5] '>
                {currentChat ? (
                    <div className='flex flex-col w-full justify-between relative p-3 h-screen'>
                        <div className='h-screen overflow-y-scroll no-scrollbar pr-3'>
                            {messages.map((m) => (
                                <div ref={scrollRef}>
                                    <Message message={m} own={m.sender !== currentUser?.userId} />
                                </div>
                            ))}
                        </div>
                        <div className='flex w-full items-center space-x-2'>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className='flex flex-col gap-4 w-full max-w-5xl'
                                >
                                    <FormField
                                        control={form.control}
                                        name='text'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea
                                                        className='w-full'
                                                        placeholder='Write something...'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button className=' px-4 py-2 rounded-md'>Send</Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center items-center h-full'>
                        <Image src={noMessagesBg} alt={'No Messeges'} />
                    </div>
                )}
            </div>
            <div className='flex-[2] border-l'>
                <div className='h-screen p-3'>
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
