import { Container } from '@mantine/core'
import allExercises  from '../assets/userExercises';
import CardsCarousel from './exercises/CardsCarousel';

export interface ExerciseProp {
  name: string;
  muscleGroup: string;
  id: string;
  description?: string;
  execution?: string[];
  advice?: string;
};

export const ExerciseCategory = ['Legs', 'Back', 'Abdominals', 'Abductors', 'Biceps', 'Calves', 'Cardio', 'Chest', 'Full Body', 'Glutes', 'Lats', 'Neck', 'Shoulders', 'Traps', 'Triceps', 'Upper Back'];

export const exercises = allExercises;

const getExercisesByCategory = (category: string) => {
  return exercises.filter((exercise) => exercise.muscleGroup === category);
};

const Exercises = () => {
  return (
    <Container className='py-[100px]' p={0} mb={"50px"}>
      <br />
      <h1 className='text-3xl md:text-7xl'> Exercises </h1>
      <br />
      <Container>
        {
          ExerciseCategory.map((category, index) => (
            <div key={index} className='border-b-[1px] border-black py-[5px]'>
              <h2 className='text-2xl md:text-4xl'> {category} </h2>
              <CardsCarousel exercises={getExercisesByCategory(category)} />
            </div>
          ))
        }
      </Container>
      <br />
    </Container>
  )
}

export default Exercises