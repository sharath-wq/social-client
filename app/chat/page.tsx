import ChatOnline from '@/components/chat/chatOnline/ChatOnline';
import Conversation from '@/components/chat/conversation/Conversation';
import Message from '@/components/chat/message/Message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import React from 'react';
import noMessagesBg from '@/public/no-message.svg';

const ChatPage = () => {
    return (
        <div className='flex h-screen'>
            <div className='flex-[2] border-r'>
                <div className='p-3 h-screen'>
                    <Input placeholder='Search for friends' />
                    <div>
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                </div>
            </div>
            <div className='flex-[5.5] '>
                {true ? (
                    <div className='flex flex-col w-full justify-between relative p-3 h-screen'>
                        <div className='h-screen overflow-y-scroll no-scrollbar pr-3'>
                            <div>
                                <Message own={true} />
                                <Message own={false} />
                                <Message own={true} />
                                <Message own={false} />
                                <Message own={true} />
                                <Message own={false} />
                                <Message own={true} />
                                <Message own={false} />
                            </div>
                        </div>
                        <div className='flex w-full items-center space-x-2'>
                            <Textarea className='w-full' placeholder='Write your message...' />
                            <Button variant={'default'} type='submit'>
                                send
                            </Button>
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
