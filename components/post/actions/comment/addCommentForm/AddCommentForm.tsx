'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});

const AddCommentForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 relative'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem className='relative flex items-center'>
                            <FormControl className='flex-1'>
                                <Input className='outline-none pr-12' placeholder='Add comment' {...field} />
                            </FormControl>
                            <Button type='submit' variant='ghost' className='ml-2 hover:bg-transparent'>
                                <Send />
                            </Button>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default AddCommentForm;
