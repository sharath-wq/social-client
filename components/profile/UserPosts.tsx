import React from 'react';
import SinglePost from '@/components/profile/SinglePost';

type posts = {
    id: string;
    author: {
        userId: string;
        username: string;
        imageUrl: string;
    };
    caption: string;
    tags: string[];
    imageUrls: string[];
    likes: string[];
    comments: string[];
    createdAt: Date;
};

type UserPostsProps = {
    posts: posts[];
};

const UserPosts = ({ posts }: UserPostsProps) => {
    return (
        <div className='container mx-auto mt-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {posts && posts.length ? (
                    posts.map((post) => <SinglePost key={post.id} imageUrl={post.imageUrls[0]} />)
                ) : (
                    <p>No Posts</p>
                )}
            </div>
        </div>
    );
};

export default UserPosts;
