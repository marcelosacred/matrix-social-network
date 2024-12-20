"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authApi } from "@/lib/api";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(5, 'Password must contain at least 5 characters').max(32, 'Password must not exceed 32 characters'),
});

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await authApi.login(values.email, values.password) as { access_token: string };
          localStorage.setItem('auth_token', 
            response.access_token);
          router.push('/news');
        } catch (error) {
          if (error instanceof Error) {
            setError('Invalid email or password');
          } else {
            setError('An unexpected error occurred');
          }
        } finally {
          setIsLoading(false);
        }
      }

  return (  
    <Card className="w-[350px]">
        <CardHeader>
            <CardTitle className='text-left'>Log in</CardTitle>
            <CardDescription className='text-left'>Enter your email and password to log in</CardDescription>
        </CardHeader>
        <CardContent>
            {error && (
                <div className="mb-4 p-2 text-sm text-destructive bg-destructive/10 rounded-md text-left">
                    {error}
                </div>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-start'>
                            <FormLabel className='text-left w-full'>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="user@example.com" {...field} />
                            </FormControl>
                            <FormMessage className='text-left'/>
                        </FormItem>
                    )}
                    />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='flex flex-col items-start'>
                                <FormLabel className='text-left w-full'>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage className='text-left'/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? "Loading..." : "Log in"}
                    </Button>
                </form>
            </Form>
        </CardContent>
        <CardFooter>
            <p className="text-sm text-center w-full">
                Don't have an account? <Link href="/auth/signup" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
        </CardFooter>
    </Card>
  )
}