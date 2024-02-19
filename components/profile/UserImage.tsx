import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

type UserImageProps = {
    username: string;
    imageUrl: string;
};

const UserImage = ({ username, imageUrl }: UserImageProps) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleEditButtonClick = () => {
        // Trigger file input when the button is clicked
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className='w-52 h-52 justify-center items-center flex flex-col'>
            {/* Conditionally render the selected image or the default image */}
            <Avatar className='w-full h-full'>
                {selectedImage ? (
                    <AvatarImage
                        src={URL.createObjectURL(selectedImage)}
                        alt={username}
                        className='w-full h-full object-cover'
                    />
                ) : (
                    <AvatarImage src={imageUrl} alt={username} className='w-full h-full object-cover' />
                )}
                <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>

            <Button variant={'outline'} className='mt-2 p-2 cursor-pointer' onClick={handleEditButtonClick}>
                Change Image
            </Button>

            {/* Hidden file input */}
            <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default UserImage;
