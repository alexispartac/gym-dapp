import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Stack, TextInput, Group, Button, Alert } from '@mantine/core';
import { modals } from '@mantine/modals';
import axios from 'axios'
import { useUser } from '../../context/UserContext';
export interface LoginProp {
    username: string;
    password: string;
};

export const LoginModal = ({ context, id }: { context: { closeModal: (id: string) => void }; id: string }) => {
    const [login, setLogin] = useState({ username: '', password: '' }); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const [, setCookie] = useCookies(['PublicKey', 'login']); 
    const { setUser } = useUser();

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

        const URL = 'http://127.0.0.1:8080/login';
        try{
            const data = { username: login.username, password: login.password };
            axios.post(URL, data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            ).then((response) => {
                console.log(response.data);
                const { public_key, jwt_token, user_id } = response.data;
                setUser({ userId: user_id, username: login.username, publicKey: public_key, isAuthenticated: true });
                setCookie('PublicKey', { public_key }, { path: '/' });
                setCookie('login', { jwt_token }, { path: '/' });
                setLoading(false);
                context.closeModal(id);
            }).catch((error) => {
                console.error(error);
                setErrorMessage('Login failed. Please try again.');
                setLoading(false);
            });
        }catch(error){
            console.log(error);
        }
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