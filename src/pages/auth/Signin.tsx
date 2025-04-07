import React, { useState } from 'react';
import { Button, Checkbox, Group, Stack, TextInput, Text, Alert } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';

export interface SigninProp {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
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

    const handleSubmit = () => {
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

        setTimeout(() => {
            console.log('Signin Data:', signin); 
            setLoading(false);
            context.closeModal(id); 
        }, 1000);
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
            />

            <TextInput
                name="email"
                label="Email"
                placeholder="Email"
                onChange={handleChange}
            />

            <TextInput
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
            />

            <TextInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                onChange={handleChange}
            />

            <Checkbox
                onChange={(e) => setChecked(e.target.checked)}
                py="3px"
                label="By signing up you agree to our terms and conditions"
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