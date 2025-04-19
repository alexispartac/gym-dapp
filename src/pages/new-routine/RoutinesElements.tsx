import { forwardRef, useImperativeHandle } from 'react'
import { Container, Stack, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import Routine from './Routine';
import { RoutineProp } from '../Routines';
import React from 'react';


interface RoutinesElementsProps {
  routinesList: RoutineProp[];
  setRoutinesList: React.Dispatch<React.SetStateAction<RoutineProp[]>>;
}

interface RoutinesElementsHandle {
  open: () => void;
  close: () => void;
}

const RoutinesElements = forwardRef<RoutinesElementsHandle, RoutinesElementsProps>(({ routinesList, setRoutinesList }, ref) => {
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
        title="Routines"
        >
        <Stack className='py-[20px] overflow-y-auto h-max-[screen]'>
          {/* maxim 6 routines */}
          {
            routinesList.length === 0 ?
              <div className='text-center'>No routines yet</div>
              :
              routinesList.map((routine, index) => (
                <Routine key={index} routine={routine} setRoutinesList={setRoutinesList} />
              ))
          }
        </Stack>
      </Modal>
    </Container>
  );
});

export default RoutinesElements;