import React from 'react';
import axios from 'axios';
import { Container } from '@mantine/core';
import {
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { useUser } from '../context/UserContext';
import { WorkoutPostProp } from './Workout';

const Balance = () => {
  const { balance } = useUser();
  return (
    <div className='text-3xl items-center my-20 flex flex-col'>
      <h1 className='text-xl md:text-5xl'>
        {balance} SOL
      </h1>
    </div>
  );
};

const SkeletonPost = () => {
  return (
    <Stack gap="6" maxW="3xl" width="full">
      <HStack width="full">
        <SkeletonText noOfLines={2} />
        <SkeletonText noOfLines={2} />
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton height="200px" />
    </Stack>
  );
};

const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
};

const Post = ({ workout }: { workout: WorkoutPostProp }) => {
  return (
    <div className="w-3xl p-6 my-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{workout.username}</h2>
        <span className="text-sm text-gray-500">
          {new Date(workout.date).toLocaleDateString()}
        </span>
      </div>

      {/* Exercises Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">Exercises:</h3>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          {workout.exercises.map((exercise, index) => (
            index < 3 && ( // Display only the first 3 exercises
              <li key={exercise.id}>
                <span className="font-medium">{exercise.name}</span> - {exercise.muscle_group}
              </li>
            )
          ))}
        </ul>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="text-gray-700">
          <p>
            <span className="font-semibold">Duration:</span> {formatDuration(workout.duration)}
          </p>
          <p>
            <span className="font-semibold">Volume:</span> {workout.volume} kg
          </p>
        </div>
        <div className="text-gray-700">
          <p>
            <span className="font-semibold">Sets:</span> {workout.sets}
          </p>
          <p>
            <span className="font-semibold">Rewards:</span> {workout.rewards / 100000000} SOL
          </p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [workouts, setWorkouts] = React.useState<WorkoutPostProp[]>([]);
  const { user } = useUser();

  const URL = `http://127.0.0.1:8080/workout/get/${user.userInfo.userId}`;
  React.useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user || !user.userInfo || !user.userInfo.userId) {
        return;
      }

      try {
        const response = await axios.get<WorkoutPostProp[]>(URL, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Reverse the array to display the latest workout first
        const reversedWorkouts = response.data.reverse();
        setWorkouts(reversedWorkouts);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
        alert("Failed to fetch workouts. Please try again.");
      }
    };

    fetchWorkouts();
  }, [URL, user]);

  return (
    <Container className='py-[100px]'>
      <Balance />
      <Container>
        {workouts.length > 0 ? (
          workouts.map((workout: WorkoutPostProp) => (
            <Post key={workout.id} workout={workout} />
          ))
        ) : (
          <Stack my={"2rem"}>
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </Stack>
        )}
      </Container>
    </Container>
  );
};

export default Home;