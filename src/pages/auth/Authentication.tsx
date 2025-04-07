import { Button, Container, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";


const Authentication = () => {
    return (
        <Container className='bg-blue-700 h-screen'>
            <Stack py={'17rem'}>
            <h1 className='flex text-7xl m-auto text-white'> BroGym </h1>
            <Button
                variant='outline'
                color='white'
                className='w-[70%] m-auto'
                onClick={() => {
                    modals.openContextModal({
                        modal: 'login',
                        title: 'LogIn',
                        innerProps: undefined,
                        centered: true,
                        padding: 'xl',
                    })
                }}>
                LogIn and Be ready for a new workout
            </Button>
                </Stack>
        </Container>
      );
}

export default Authentication