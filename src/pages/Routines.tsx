import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Container, Button, Stack, Group, Modal } from '@mantine/core'
import { IconSearch, IconLibrary } from '@tabler/icons-react';
import { ExerciseProp,  } from './Exercises';
import { useDisclosure } from '@mantine/hooks';
import { exercises } from './Exercises';
import NewRoutine from './new-routine/NewRoutine';
import Routine from './new-routine/Routine';
export interface RoutineExerciseProp extends ExerciseProp {
  inRoutine: boolean;
}
export interface RoutineProp {
  name: string;
  exercises: RoutineExerciseProp[];
}

export const exercisesForRoutine: RoutineExerciseProp[] = exercises.map( (exercise: ExerciseProp) =>  {
  return { ...exercise, inRoutine: false}
})

// rutinele din baza de date
export const routinesList = [
  {
    name: 'Push Day',
    exercises: [
      {
        name: 'Bench Press',
        muscleGroup: 'Chest',
        id: '1',
        inRoutine: false
      },
      {
        name: 'Squat',
        muscleGroup: 'Legs',
        id: '2',
        inRoutine: false
      },
      {
        name: 'Deadlift',
        muscleGroup: 'Back',
        id: '3',
        inRoutine: false
      }
    ],
  },
  {
    name: 'Cardio',
    exercises: [
      {
        name: 'Running',
        muscleGroup: 'Cardio',
        id: '10',
        inRoutine: false
      },
      {
        name: 'Cycling',
        muscleGroup: 'Cardio',
        id: '11',
        inRoutine: false
      },
      {
        name: 'Swimming',
        muscleGroup: 'Cardio',
        id: '12',
        inRoutine: false
      }
    ],
  },
  {
    name: 'Cardio',
    exercises: [
      {
        name: 'Running',
        muscleGroup: 'Cardio',
        id: '10',
        inRoutine: false
      },
      {
        name: 'Cycling',
        muscleGroup: 'Cardio',
        id: '11',
        inRoutine: false
      },
      {
        name: 'Swimming',
        muscleGroup: 'Cardio',
        id: '12',
        inRoutine: false
      }
    ],
  },
  {
    name: 'Cardio',
    exercises: [
      {
        name: 'Running',
        muscleGroup: 'Cardio',
        id: '10',
        inRoutine: false
      },
      {
        name: 'Cycling',
        muscleGroup: 'Cardio',
        id: '11',
        inRoutine: false
      },
      {
        name: 'Swimming',
        muscleGroup: 'Cardio',
        id: '12',
        inRoutine: false
      }
    ],
  },
  {
    name: 'Cardio',
    exercises: [
      {
        name: 'Running',
        muscleGroup: 'Cardio',
        id: '10',
        inRoutine: false
      },
      {
        name: 'Cycling',
        muscleGroup: 'Cardio',
        id: '11',
        inRoutine: false
      },
      {
        name: 'Swimming',
        muscleGroup: 'Cardio',
        id: '12',
        inRoutine: false
      }
    ],
  }
]

export const RoutinesElements = forwardRef((_props, ref) => {
  const [opened, { open, close }] = useDisclosure(false);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Container>
      <Modal 
        opened={opened} 
        onClose={close}
        title='Routines'
        >
        <Stack className='py-[20px] overflow-y-auto h-max-[screen]'>
          {/* maxim 6 routines */}
          {routinesList.map((routine, index) => (
            <Routine key={index} routine={routine} />
          ))}
        </Stack>
      </Modal>
    </Container>
  );
});

const RoutineContiner = () => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  // creeaza un ref pentru componenta RoutinesElements
  const routinesRef = useRef<{ open: () => void; close: () => void }>(null);

  const handleOpenModal = () => {
    if (routinesRef.current) {
      routinesRef.current.open(); // apeleaza functia open din componenta RoutinesElements
    }
  };

  return (
    <Container p={0}>
      <h1 className="text-xl font-medium">Routines</h1>
      <RoutinesElements ref={routinesRef} />

      <Group className="flex justify-between my-[10px]">
        <Modal
          opened={opened}
          onClose={closeModal}
          title="Create a Routine"
        >
          <NewRoutine exercises={exercisesForRoutine} handleClose={closeModal} />
        </Modal>
        <Button
          variant="outline"
          color="blue"
          className="w-[50%]"
          onClick={openModal}
        >
          <IconLibrary className="mr-2" />
          New Routine
        </Button>
        <Button
          variant="outline"
          color="blue"
          className="w-[42%]"
          onClick={handleOpenModal} // Apelare funcție `open` din copil
        >
          <IconSearch className="p-1" />
          Explore
        </Button>
      </Group>
    </Container>
  );
};


const Routines = () => {
  return (
    <Container>
      <br />
      <h1 className='text-2xl'> My Routines </h1>
      <br />
      <div className='py-[2rem] px-[1rem] rounded-md shadow-md border-[1px] flex-col items-center'>
        <RoutineContiner />   
      </div>
      <br /> <br /> <br /> <br />
    </Container>
  )
}

export default Routines