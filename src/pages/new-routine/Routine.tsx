import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Group, Modal, Stack } from "@mantine/core";
import WorkoutExercises, { userExercises }  from "../new-workout/WorkoutExercises";
import { Sets, Timer, Volume } from "../new-workout/NewWorkout";
import { addExercise, clearExercises } from "../new-workout/workoutSlice";
import { RoutineExerciseProp, RoutineProp } from "../Routines";
import { AppDispatch, RootState } from "../new-workout/store";


const InfoRoutine = ({ routine, openInfoRoutine, close }: { routine: RoutineProp; openInfoRoutine: boolean; close: () => void }) => {
    return (
        <Container>
            <Modal opened={openInfoRoutine} onClose={close} title={routine.name}>
                {routine.exercises.map((exercise) => (
                    <div
                        key={exercise.id}
                        className="flex flex-row my-[7px] mx-[2px] shadow-sm shadow-gray-400"
                    >
                        <h1 className="w-[80%] flex justify-start p-[10px]">
                            {exercise.name}
                        </h1>
                    </div>
                ))}
            </Modal>
        </Container>
    );
};

const StartRoutine = ({
    openStartRoutine,
    close,
    setOpenStartRoutine,
    elapsedTimeRef,
    handleStop
}: {
    openStartRoutine: boolean;
    close: () => void;
    setOpenStartRoutine: (value: boolean) => void;
    elapsedTimeRef: React.MutableRefObject<number>;
    handleStop: () => void;
}) => {
    const isMobile = useMediaQuery("(max-width: 50em)");
    const exercises = useSelector((state: RootState) => state.workout.exercises);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <Container>
            {openStartRoutine ? (
                <Modal
                    opened={openStartRoutine}
                    withCloseButton={false}
                    onClose={() => {
                        close();
                        dispatch(clearExercises());
                    }} 
                    fullScreen={isMobile}
                    transitionProps={{ transition: "fade-up", duration: 700 }}
                    title="Log Workout"
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
                        <WorkoutExercises 
                            workoutExercises={exercises} 
                            setStatusWorkout={setOpenStartRoutine}
                            elapsedTimeRef={elapsedTimeRef}
                            handleStop={handleStop}
                            />
                        <br />
                    </Container>
                </Modal>
            ) : null}
        </Container>
    );
};


const Routine = ({ routine }: { routine: RoutineProp }) => {
    const [openInfoRoutine, setOpenInfoRoutine] = React.useState<boolean>(false);
    const [openStartRoutine, setOpenStartRoutine] = React.useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const startTimeRef = React.useRef<number | null>(null); 
    const elapsedTimeRef = React.useRef(0); 

    const handleStart= () => {
    startTimeRef.current = Date.now(); 
    };

    const handleStop = () => {
    if (startTimeRef.current) {
        const timePressed = Date.now() - startTimeRef.current; 
        elapsedTimeRef.current = timePressed; 
        startTimeRef.current = null; 
    }
    };

    const handleAddWorkout = () => {
        routine.exercises.forEach((routineExercise: RoutineExerciseProp) => {
            const { inRoutine, ...rest } = routineExercise; 
            const userExercise = userExercises.find((exercise) => exercise.name === routineExercise.name);
            if(userExercise)
            dispatch(addExercise({...rest, inWorkout: true, sets: userExercise.sets}));
        });
    }

    return (
        <Container className="w-full h-[120px] bg-gray-100 py-[10px] px-[1rem] rounded-md shadow-md border-[1px] flex-col items-center">
            <Group>
                <Stack gap={0.5} className="w-[45%]">
                    <h1 className="font-medium">{routine.name}</h1>
                    <Group>
                        <Stack gap={0} pl={5} className="w-[110px]">
                            {routine.exercises.map((exercise, index) => {
                                if (index < 3) {
                                    return (
                                        <h1 key={index} className="truncate">
                                            {exercise.name}
                                        </h1>
                                    );
                                }
                                return null;
                            })}
                        </Stack>
                    </Group>
                </Stack>
                <Stack gap={1} className="w-[45%]">
                    <Button
                        variant="outline"
                        color="blue"
                        className="w-full my-[5px]"
                        onClick={() => setOpenInfoRoutine(true)}
                    >
                        VIEW
                    </Button>
                    <Button
                        variant="outline"
                        color="blue"
                        className="bg-blue-500 text-white w-full my-[5px]"
                        onClick={() => {
                            setOpenStartRoutine(true);
                            handleAddWorkout();
                            handleStart();
                        }}
                    >
                        START
                    </Button>
                </Stack>
                <InfoRoutine routine={routine} openInfoRoutine={openInfoRoutine} close={() => setOpenInfoRoutine(false)} />
                <StartRoutine 
                    openStartRoutine={openStartRoutine} 
                    setOpenStartRoutine={setOpenStartRoutine} 
                    close={() => setOpenStartRoutine(false)} 
                    elapsedTimeRef={elapsedTimeRef}
                    handleStop={handleStop}
                />
            </Group>
        </Container>
    );
};

export default Routine;