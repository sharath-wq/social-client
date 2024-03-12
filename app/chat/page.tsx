'use client';

import { z } from 'zod';

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
import { Socket, io } from 'socket.io-client';

const ChatPage = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);
    const [messages, setMessages] = useState<IMessage[] | []>([]);
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState<any>([]);
    const socket = useRef<Socket>();
    const { currentUser } = useUser();
    const scrollRef: any = useRef();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.replace('/auth/login');
        } else {
            router.replace('/chat');
        }
    }, [currentUser, router]);

    useEffect(() => {
        socket.current = io('wss://xsocial.dev');
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current?.emit('addUser', currentUser && currentUser.userId);
        socket.current?.on('getUsers', (users) => {
            currentUser && setOnlineUsers(currentUser.following.filter((f) => users.some((u: any) => u.userId === f)));
        });
    }, [currentUser, socket.current]);

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

            socket.current?.emit('sendMessage', {
                senderId: currentUser?.userId,
                receiverId,
                text: values.text,
            });

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

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        currentUser && (
            <div className='flex h-screen overflow-hidden'>
                <div className='flex-[2] border-r'>
                    <div className='p-3 h-[80vh]'>
                        <Input placeholder='Search for friends' />
                        <div className='h-full overflow-y-scroll no-scrollbar'>
                            {conversations.map((c: any) => (
                                <div key={c.id} onClick={() => setCurrentChat(c)}>
                                    <Conversation currentChat={currentChat} conversation={c} currentUser={currentUser} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex-[5.5] '>
                    {currentChat ? (
                        <div className='flex flex-col w-full justify-between relative p-3 h-screen'>
                            <div className='h-screen overflow-y-scroll no-scrollbar pr-3'>
                                {messages.map((m: any) => (
                                    <div key={m.id} ref={scrollRef}>
                                        <Message message={m} own={m.sender !== currentUser?.userId} />
                                    </div>
                                ))}
                            </div>
                            <div className='flex w-full items-center'>
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

                                        <Button className='px-4 py-2 rounded-md'>Send</Button>
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
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={currentUser.userId}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default ChatPage;
