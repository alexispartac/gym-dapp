import React from "react";
import { Keypair } from "@solana/web3.js";
import { Button, Container, Group, Modal, MultiSelect, Stack } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { IconPlus } from "@tabler/icons-react";
import { AppDispatch, RootState } from "./store";
import { addExercise, clearExercises, removeExercise } from "./workoutSlice";
import { resetVolume } from "./volumeSlice";
import { resetSets } from "./setsSlice";
import { ExerciseProp, exercises, ExerciseCategory } from "../Exercises";
import { WorkoutExercisesProp } from "../Workout";
import ListOfExercises from "./ListOfExercises";
import Exercise, { SetProp } from "./Exercise";
import TransferSolana from "../solana/transfer-sol";
import { SECRET_KEY } from '../../constants'
import Reward from "./Reward";
import { DiscardWorkoutModal, FinishWorkoutModal } from "./WorkoutModals";

const exercisesWorkout = exercises.map(
    (exercise: ExerciseProp) => {
        return {
            ...exercise,
            inWorkout: false,
            sets: [] 
        }
    }
)

// exercitiile userului din baza de date 
export const userExercises = exercises.map(
    (exercise: ExerciseProp) => {
        return {
            ...exercise,
            sets: [
              { setNumber: 1, kg: 5, reps: 20, previous: "3kg x 15", done: false },
              { setNumber: 2, kg: 6, reps: 18, previous: "3kg x 15", done: false },
              { setNumber: 3, kg: 7, reps: 15, previous: "3kg x 15", done: false }
            ]
        }
    }

)

const WorkoutExercises = (
    { workoutExercises, setStatusWorkout }:
    { workoutExercises: WorkoutExercisesProp[]; setStatusWorkout: (status: boolean) => void }
) => {
    const [selectedExercises, setSelectedExercises] = React.useState<string[]>(['All Muscles']);  // categoriile de exercitii
    const [exerciseKeys] = React.useState(() => new Map());
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = React.useState(false); 
    const isMobile = useMediaQuery('(max-width: 50em)');
    const dispatch = useDispatch<AppDispatch>();
    const sets = useSelector((state: RootState) => state.sets.count);
    const volume = useSelector((state: RootState) => state.volume.count);
    const [ cookies ] = useCookies(['PublicKey']);
    const publicKey = cookies.PublicKey.publicKey;

    // lista de exercitii disponibile pentru workout, in care am evidentiat cele care sunt deja in workout
    const [listOfExercisesForWorkout, setListOfExercisesForWorkout] = React.useState<WorkoutExercisesProp[]>(
        exercisesWorkout.map((exerciseWorkout: WorkoutExercisesProp) => {
            if (workoutExercises.find((exercise: WorkoutExercisesProp) => exercise.id === exerciseWorkout.id))
                return {
                    ...exerciseWorkout,
                    inWorkout: true,
                }
            else {
                return {
                    ...exerciseWorkout,
                    inWorkout: false
                }
            }
        }
        )
    )

    // adaugam exercitii in workout si evidentiam in lista de exercitii disponibile
    const handleAddExercise = (exercise: WorkoutExercisesProp) => {
        // am cautat in in lists de exercitii a utilizatorului daca exercitiul a mai fost facut, daca ad am luat seturile efectuate
        const sets = userExercises.find((ex) => ex.id === exercise.id)?.sets || [];

        if (!exercise.inWorkout) {
            setListOfExercisesForWorkout(listOfExercisesForWorkout.map((exerciseForWorkout: WorkoutExercisesProp) => {
                if (exerciseForWorkout.id === exercise.id) {
                    return {
                        ...exerciseForWorkout,
                        sets: sets,
                        inWorkout: true
                    }
                }
                return exerciseForWorkout;
            }))
            dispatch(addExercise(
                {
                    ...exercise,
                    sets: sets,
                    inWorkout: true
                }
            ));
        }
    };

    // stergem din lista de exercitii aflate in antrenament si setam in lista de exercitii disponibile ca nu se mai afla in new workout
    const handleDeleteExercises = (exercise: WorkoutExercisesProp) => {
        setListOfExercisesForWorkout((prevExercises) => {
            return prevExercises.map((prevExercise) => {
                if (prevExercise.id === exercise.id) {
                    return { ...prevExercise, inWorkout: false };
                }
                return prevExercise;
            });
        });
        dispatch(removeExercise({ id: exercise.id }));
    }

    // stergem toate exercitiile din workout si evidentierea din lista de exercitii disponibile
    const handleDiscardWorkout = () => {
        setListOfExercisesForWorkout(listOfExercisesForWorkout.map((exerciseForWorkout: WorkoutExercisesProp) => {
            return {
                ...exerciseForWorkout,
                inWorkout: false
            }
        }))
        dispatch(resetVolume());
        dispatch(resetSets());
        dispatch(clearExercises());
        setStatusWorkout(false);
    };

    // am creiat o cheie pentru a mentine identitatea unica fiecarei componente
    const getExerciseKey = (exerciseId: string) => {
        if (!exerciseKeys.has(exerciseId)) {
            exerciseKeys.set(exerciseId, Math.random().toString(36));
        }
        return exerciseKeys.get(exerciseId);
    };


    const handleFinishWorkout = async( exercisesWorkout : WorkoutExercisesProp[] ) => {
        let flag = true;
        setLoading(true);

        if( exercisesWorkout.length === 0 ){
            setLoading(false);
            modals.openContextModal({
                modal: 'expected',
                title: 'Finish workout',
                centered: true,
                withCloseButton: false,
                size: 'sm',
                radius: 'md',
                innerProps: {
                    modalBody: 'You have to add at least one exercise to finish the workout!',
                },
            });
            return;
        }
        
        exercisesWorkout.forEach( (exercise: WorkoutExercisesProp) =>  
            {
                const setIsNotFinish = exercise.sets.find( (set: SetProp) => set.done === false )
                if(setIsNotFinish !== undefined)
                    flag = false;
            }
        )

        if( !flag ){
            setLoading(false);
            modals.openContextModal({
                modal: 'expected',
                title: 'Finish workout',
                centered: true,
                withCloseButton: false,
                size: 'sm',
                radius: 'md',
                innerProps: {
                    modalBody: 'You have to finish all sets to finish the workout!',
                },
            });
        }else{
            // adauga exercitiilt in baza de date a utilizatorului
            // modifica seturile pentru urmatoarele antrenamente
            const amount = Reward({ sets, volume });    
            const senderKeypair : Keypair = Keypair.fromSecretKey(SECRET_KEY);
            await TransferSolana({ senderKeypair, recipientPubKey: publicKey, amountToSend: amount })
            setLoading(false);
            handleDiscardWorkout();
            console.log("Congrats! Finish workout!", exercisesWorkout);
            FinishWorkoutModal();
            // salvare in baza de date a userului

        }
    }

    return (
        <Container p={0} className='flex flex-col border-t-[1px] border-black'>
            {
                // daca nu sunt exercitii in workout ul nostru afisam blocul executat pe true altfel afisam exercitiile 
                workoutExercises.length === 0 ?
                    <Stack className='flex flex-col items-center justify-center border-t-[1px] border-black'>
                        <IconPlus size={120} color='gray' />
                        <h1 className='text-2xl font-bold text-gray-800' > Get Started </h1>
                        <p> Add a exercise to start your workout </p>
                    </Stack>
                    :
                    workoutExercises.map((exercise: WorkoutExercisesProp, index: number) => (
                        <Exercise
                            key={getExerciseKey(exercise.id)}
                            exercise={exercise}
                            handleDeleteExercises={handleDeleteExercises}
                        />
                    ))
            }

            {/* lista cu exercitii  */}
            <Container>
                <Modal
                    opened={opened}
                    onClose={close}
                    fullScreen={isMobile}
                    transitionProps={{ transition: 'fade-up', duration: 700 }}
                    title='Exercises' // ﹀
                    padding={20}
                    className='text-md'
                >
                    <Container>
                        <Stack>
                            <MultiSelect
                                placeholder="Pick value"
                                defaultValue={['All Muscles']}
                                clearable
                                value={selectedExercises}
                                onChange={setSelectedExercises}
                                data={ExerciseCategory}
                            />
                        </Stack>
                    </Container>
                    <ListOfExercises
                        selectedExercises={selectedExercises}
                        exercises={listOfExercisesForWorkout}
                        handleAddExercise={handleAddExercise}
                        handleDeleteExercise={handleDeleteExercises}
                    />
                </Modal>
            </Container>

            {/* buton de adaugare exercitiu */}
            <Button
                variant='outline'
                color='blue'
                className='flex w-full align-start md:pl-[50px] my-[10px] bg-blue-700 text-white'
                onClick={open}
            >
                + Add Exercise
            </Button>

            {/* !!!!!! adaugare alerta inainte de a confirma stergerea */}
            <Group>
                
            <Button
                variant='outline'
                color='green'
                className='flex w-[47.5%] align-start md:pl-[20px] my-[10px] bg-green-700 text-white'
                onClick={ () => handleFinishWorkout(workoutExercises)}
                >
                {loading ? 'Se procesează...' : 'Finish Workout'}
            </Button>
            
            <Button
                variant='outline'
                color='red'
                className='flex w-[47.5%] align-start md:pl-[20px] my-[10px] bg-red-700 text-white'
                onClick={() => DiscardWorkoutModal({ handleDiscardWorkout })}
                >
                Discard Workout
            </Button>
                </Group>
        </Container>
    );
}

export default WorkoutExercises;