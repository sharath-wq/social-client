import React from 'react';

const SinglePost = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className='p-4 rounded-md'>
            <img src={imageUrl} alt='Post' className='w-full h-60 object-contain mb-4 rounded-md' />
        </div>
    );
};

export default SinglePost;
