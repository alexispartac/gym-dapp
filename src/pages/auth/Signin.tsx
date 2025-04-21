import React, { useState } from 'react';
import { Button, Checkbox, Group, Stack, TextInput, Text, Alert } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import GenerateKepair from '../solana/generate-keypair';
export interface SigninProp {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SigninDBProp {
    username: string;
    email: string;
    password: string;
    public_key: string;
    user_id: string;
}

export const SigninModal = ({ context, id }: ContextModalProps ) => {
    const [signin, setSignin] = useState<SigninProp>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [checked, setChecked] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(''); 
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignin({ ...signin, [e.target.name]: e.target.value });
    };

    const handleSubmit = async() => {
        if (!signin.username || signin.username.length < 4) {
            setErrorMessage('Username must be at least 8 characters long.');
            return;
        }

        if (!signin.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signin.email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        if (!signin.password || signin.password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }

        if (signin.password !== signin.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (!checked) {
            setErrorMessage('You must agree to the terms and conditions.');
            return;
        }

        setErrorMessage('');
        setLoading(true);

        const URL = 'http://127.0.0.1:8080/user/signin';
        const Keypair = await GenerateKepair();
        try{
            const data : SigninDBProp = {
                username: signin.username,
                email: signin.email,
                password: signin.password,
                public_key: Keypair.publicKey.toString(),
                user_id: uuidv4()
            }
            axios.post(URL, data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            ).then((response) => {
                console.log(response.data);
                const message = (response.data as { message: string }).message;
                if (message === 'User already exists') {
                    setErrorMessage('User already exists');
                    setLoading(false);
                    return;
                }
                setLoading(false);
                context.closeModal(id);
            }).catch((error) => {
                console.error(error);
                setErrorMessage('Signin failed. Please try again.');
                setLoading(false);
            });
        }catch(error){
            console.log(error);
        }

    };

    return (
        <Stack>
            {errorMessage && (
                <Alert title="Error" color="red" variant="filled" mb="xs">
                    {errorMessage}
                </Alert>
            )}

            <TextInput
                name="username"
                label="Username"
                placeholder="Username"
                data-autofocus
                onChange={handleChange}
                classNames={
                    {
                        input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                        label: "text-white",
                        error: "text-red-500",
                    }
                }
            />

            <TextInput
                name="email"
                label="Email"
                placeholder="Email"
                onChange={handleChange}
                classNames={
                    {
                        input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                        label: "text-white",
                        error: "text-red-500",
                    }
                }
            />

            <TextInput
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                classNames={
                    {
                        input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                        label: "text-white",
                        error: "text-red-500",
                    }
                }
            />

            <TextInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                onChange={handleChange}
                classNames={
                    {
                        input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                        label: "text-white",
                        error: "text-red-500",
                    }
                }
            />

            <Checkbox
                onChange={(e) => setChecked(e.target.checked)}
                py="3px"
                label="By signing up you agree to our terms and conditions"
                classNames={
                    {
                        input: "bg-neutral-800 text-white border-neutral-700 focus:border-blue-500 focus:ring-blue-500",
                        label: "text-white",
                        error: "text-red-500",
                    }
                }
            />

            <Text>
                Already have an account?{' '}
                <Button
                    variant="outline"
                    color="blue"
                    className="h-[20px]"
                    onClick={() => {
                        context.closeModal(id);
                        modals.openContextModal({
                            modal: 'login',
                            title: 'LogIn',
                            innerProps: undefined,
                            centered: true,
                            padding: 'xl',
                        });
                    }}
                >
                    LogIn
                </Button>
            </Text>

            <Group justify="flex-end" mt="md">
                <Button
                    type="submit"
                    disabled={
                        loading ||
                        !checked ||
                        signin.username === '' ||
                        signin.email === '' ||
                        signin.password === '' ||
                        signin.confirmPassword === ''
                    }
                    color="white"
                    bg="blue"
                    variant="outline"
                    onClick={handleSubmit}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </Group>
        </Stack>
    );
};