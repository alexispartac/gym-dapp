import React, { useState, useEffect }  from "react";
import { Button, Container, Group, Modal, Stack } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { IconPlus } from "@tabler/icons-react";
import { AppDispatch, RootState } from "./store";
import { WorkoutExercisesProp } from "../Workout";
import WorkoutExercises from "./WorkoutExercises";
import { clearExercises } from "./workoutSlice";


export const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 59) {
              setHours((prevHours) => prevHours + 1);
              return 0;
            }
            return prevMinutes + 1;
          });
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div>
      <h1>Duration</h1>
      <h1>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>
    </div>
  );
};

export const Volume = () => {
  const volume = useSelector((state: RootState) => state.volume.count);
  return (
    <div>
      <h1>Volume</h1>
      <h1>{volume}</h1>
    </div>
  );
}

export const Sets = () => {
  const sets = useSelector((state: RootState) => state.sets.count);
  return (
    <div>
      <h1>Sets</h1>
      <h1>{sets}</h1>
    </div>
  );
}

const NewWorkout = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [statusWorkout, setStatusWorkout] = React.useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 50em)");
  const dispatch = useDispatch<AppDispatch>();

  const workoutExercises: WorkoutExercisesProp[] = useSelector(
    (state: RootState) => state.workout.exercises
  );

  

  return (
    <Container m={0} p={0}>
      {statusWorkout ? (
        <Modal
          opened={opened}
          onClose={() => {
            close();
            dispatch(clearExercises());
          }} 
          fullScreen={isMobile}
          transitionProps={{ transition: "fade-up", duration: 700 }}
          title="Log Workout" // ﹀
          padding={7}
        >
        <Container className="bg-white shadow-xl">
            <Group className="grid grid-cols-3 gap-4 py-[5px] font-light">
                <Stack gap={0}>
                    <Timer />
                </Stack>
                <Stack gap={0}>
                    <Volume />
                </Stack>
                <Stack gap={0}>
                    <Sets />
                </Stack>
            </Group>
            <br />
            {/* trimitem exercitiile care se afla in workout nu cele din lista de exercitii */}
            <WorkoutExercises
                workoutExercises={workoutExercises}
                setStatusWorkout={setStatusWorkout}
            />
            <br />
        </Container>
        </Modal>
      ) : null}

      <Button
        variant="outline"
        color="blue"
        className="flex w-full align-start md:pl-[50px]"
        onClick={() => {
          open();
          setStatusWorkout(true);
        }}
      >
        <Group>
          <IconPlus className="mr-2" />
          Start Empty Workout
        </Group>
      </Button>
    </Container>
  );
};

export default NewWorkout;
