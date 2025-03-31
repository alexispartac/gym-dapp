import { Button, Container, Group, Stack } from "@mantine/core";
import { RoutineProp } from "../Routines";


const Routine = ({ routine } : { routine : RoutineProp }) => {
  return(
    <Container className="w-full h-[120px] bg-gray-100 py-[10px] px-[1rem] rounded-md shadow-md border-[1px] flex-col items-center">
      <Group>
        <Stack gap={0.5} className='w-[45%]'>
          <h1 className='font-medium'>{routine.name}</h1>
          <Group>
              <Stack gap={0} pl={5} className='w-[110px]'>
                {
                    routine.exercises.map((exercise, index) => {
                        if (index < 3)
                            return (
                                <h1 key={index} className='truncate'> {exercise.name} </h1>
                            )
                        return null;
                    })
                }
              </Stack>
          </Group>
        </Stack>
        <Stack gap={1} className='w-[45%]'>
            <Button variant='outline' color='blue' className='w-full my-[5px]'>
              {/* o componenta care arata exercitiile salvate in rutina, ofera posibilitatea sa le si schimbe */}
              VIEW 
            </Button>
            <Button variant='outline' color='blue' className='bg-blue-500 text-white w-full my-[5px]'>
              {/* o componenta new workout care preia exercitiile salvate in rutina */}
              START
            </Button>
        </Stack>
      </Group>
    </Container>
  );
}

export default Routine;