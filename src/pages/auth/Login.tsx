import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Stack, TextInput, Group, Button, Alert } from '@mantine/core';
import { modals } from '@mantine/modals';

export interface LoginProp {
    username: string;
    password: string;
};
export const LoginModal = ({ context, id }: { context: { closeModal: (id: string) => void }; id: string }) => {
    const [login, setLogin] = useState({ username: '', password: '' }); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const [, setCookie] = useCookies(['PublicKey', 'login']); 

    const handleChange = (e : any) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };


    const handleSubmit = () => {
        if (!login.username || login.username.length < 8) {
            setErrorMessage('Username trebuie să aibă cel puțin 4 caractere.');
            return;
        }

        if (!login.password || login.password.length < 8) {
            setErrorMessage('Parola trebuie să aibă cel puțin 8 caractere.');
            return;
        }

        setErrorMessage('');
        setLoading(true);

        setTimeout(() => {
            const publicKey = '4qRMSiUmyvaWxXsJFUeu7uACa8tkcbpNNhi7bV2H1p3n'; 
            setCookie('PublicKey', { publicKey }, { path: '/' });
            setCookie('login', login, { path: '/' });
            console.log(login, 'login');

            setLoading(false);
            context.closeModal(id); 
        }, 2000); 
    };

    return (
        <Stack>
            {errorMessage && (
                <Alert title="Eroare" color="red" variant="filled">
                    {errorMessage}
                </Alert>
            )}

            <TextInput
                name="username"
                label="Username"
                placeholder="Your username"
                data-autofocus
                onChange={handleChange}
            />

            <TextInput
                name="password"
                label="Password"
                placeholder="Your password"
                type="password"
                onChange={handleChange}
            />

            <Group justify="flex-end" mt="md">
                <Button
                    type="button"
                    color="blue"
                    variant="outline"
                    onClick={() => {
                        context.closeModal(id);
                        modals.openContextModal({
                            modal: 'signin',
                            title: 'SignIn',
                            centered: true,
                            innerProps: undefined,
                        });
                    }}
                >
                    SignIn
                </Button>

                <Button
                    type="button"
                    disabled={loading || login.username === '' || login.password === ''}
                    color="white"
                    bg="blue"
                    variant="outline"
                    onClick={handleSubmit}
                >
                    {loading ? 'Se procesează...' : 'Submit'}
                </Button>
            </Group>
        </Stack>
    );
};