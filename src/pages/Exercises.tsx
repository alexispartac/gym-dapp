import React from 'react'
import { Container,  Button} from '@mantine/core'
import { Badge, HStack } from "@chakra-ui/react"
import Carousel  from "../components/ui/card-carousel"

interface ExerciseProps {
  name: string;
  muscleGroup: string;
}

export function CardsCarousel() {
  const cards = exercises.map((card, index) => (
    <Exercise key={index} exercise={card} />
  ));

  return (
    <div className="w-full h-full py-5">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-4xl text-black font-sans">
         "Category"
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

export const Exercise = ( { exercise } : {exercise: ExerciseProps} ) => (
  <div className='flex w-[210px] rounded-md border-[1px] shadow-md flex-row my-2'>
    <div className='flex flex-col px-3 py-4 w-full'>
        <div> { exercise.name } </div>
        <HStack>
          <Badge> { exercise.muscleGroup } </Badge>
        </HStack>
        <div className='flex flex-row justify-between pt-1'>
          <Button fullWidth className='bg-blue-700 w-[47%] text-[11px]' p={'0'} variant="filled" color="rgba(82, 113, 255, 0.96)" radius="md" my={2}> Add </Button>
          <Button fullWidth className='bg-gray-400 w-[47%] text-[11px]' p={'0'} variant="filled" color="rgba(173, 173, 173, 0.96)" radius="md" my={2}> View </Button>
        </div>
    </div>
  </div>
)

const exercises = [
  {
    name: 'Bench Press',
    muscleGroup: 'Chest',
  },
  {
    name: 'Squat',
    muscleGroup: 'Legs',
  },
  {
    name: 'Deadlift',
    muscleGroup: 'Back',
  },
  {
    name: 'Overhead Press',
    muscleGroup: 'Shoulders',
  },
  {
    name: 'Bicep Curl',
    muscleGroup: 'Arms',
  },
  {
    name: 'Tricep Extension',
    muscleGroup: 'Arms',
  },
  {
    name: 'Lunges',
    muscleGroup: 'Legs',
  },
  {
    name: 'Plank',
    muscleGroup: 'Core',
  },
  {
    name: 'Lat Pulldown',
    muscleGroup: 'Back',
  },
  {
    name: 'Calf Raises',
    muscleGroup: 'Legs',
  },
  {
    name: 'Barbell Row',
    muscleGroup: 'Back',
  },
  {
    name: 'Dumbbell Fly',
    muscleGroup: 'Chest',
  },
  {
    name: 'Hamstring Curl',
    muscleGroup: 'Legs',
  },
  {
    name: 'Skull Crushers',
    muscleGroup: 'Arms',
  },
  {
    name: 'Leg Press',
    muscleGroup: 'Legs',
  },
  {
    name: 'Incline Bench Press',
    muscleGroup: 'Chest',
  },
  {
    name: 'Russian Twist',
    muscleGroup: 'Core',
  },
  {
    name: 'Seated Row',
    muscleGroup: 'Back',
  },
  {
    name: 'Preacher Curl',
    muscleGroup: 'Arms',
  },
  {
    name: 'Leg Extension',
    muscleGroup: 'Legs',
  },
  {
    name: 'Dumbbell Shoulder Press',
    muscleGroup: 'Shoulders',
  }
]


const Exercises = () => {
  return (
    <Container mb={"50px"}>
      <br />
      <h1 className='text-5xl md:text-7xl'> Exercises </h1>
      <br />
      <CardsCarousel />
      <CardsCarousel />
      <CardsCarousel />
      <CardsCarousel />
      <CardsCarousel />
      <CardsCarousel />
      <br />
    </Container>
  )
}

export default Exercises