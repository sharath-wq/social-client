import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface Author {
    userId: string;
    username: string;
    imageUrl: string;
}

interface Post {
    id: string;
    author: Author;
    caption: string;
    tags: string[];
    imageUrls: string[];
    likes: string[];
    comments: string[];
    createdAt: string;
}

interface PostContextType {
    posts: Post[];
    getPosts: () => Promise<void>;
}

const PostContext = createContext<PostContextType>({
    posts: [],
    getPosts: async () => {},
});

export const usePost = (): PostContextType => {
    return useContext(PostContext);
};

export const PostProvider: React.FC = ({ children }: any) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const getPosts = async () => {
        try {
            const { data } = await axios.get('/api/posts');
            setPosts(data);
        } catch (e) {
            const error = e as AxiosError;
            console.error('Error fetching posts:', error.message);
            setPosts([]);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                await getPosts();
            } catch (e) {
                const error = e as AxiosError;
                console.error('Error fetching posts on mount:', error.message);
                setPosts([]);
            }
        })();
    }, []);

    const postContextValue: PostContextType = {
        posts,
        getPosts,
    };

    return <PostContext.Provider value={postContextValue}>{children}</PostContext.Provider>;
};
