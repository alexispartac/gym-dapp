import { useRef } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Container, Group, Modal } from "@mantine/core";
import { IconLibrary, IconSearch } from "@tabler/icons-react";
import { exercisesForRoutine } from "../Routines";
import NewRoutine from "./NewRoutine";
import RoutinesElements from "./RoutinesElements";


const RoutineContainer = () => {
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
          onClick={handleOpenModal} 
        >
          <IconSearch className="p-1" />
          Explore
        </Button>
      </Group>
    </Container>
  );
};

export default RoutineContainer;