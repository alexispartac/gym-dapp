import React, { useEffect } from 'react'
import { Container } from '@mantine/core'
import {
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
} from "@chakra-ui/react"
import { useUser } from '../context/UserContext';
import { useCookies } from 'react-cookie';
import { CheckBalance } from './solana/check-balance';
interface NewsItem {
  id: number;
  name: string;
  image: string;
  link: string;
}

const newsItems : NewsItem[] = [
  {
    id: 1,
    name: 'Monday is for chest',
    image: '',
    link: ''
  },
  {
    id: 2,
    name: 'Monday is for chest',
    image: '',
    link: ''
  },
  {
    id: 3,
    name: 'Monday is for chest',
    image: '',
    link: ''
  },
  {
    id: 4,
    name: 'Monday is for chest',
    image: '',
    link: ''
  },
  {
    id: 5,
    name: 'Monday is for chest',
    image: '',
    link: ''
  }
];

const Balance = () => {
  const { balance } = useUser();
  return (
    <div className='text-3xl items-center my-20 flex flex-col'>
      <h1 className='text-xl md:text-5xl'>
        { balance } SOL
      </h1>
    </div>
  )
}

const News = () => {
  const [news, setNews] = React.useState<NewsItem[]>([])

  // fetch news
  React.useEffect(() => {
    // todo: fetch news from server
    setNews(newsItems);
  }, [])

  return (
    <Container>
      {news.map((data: any) => {
        return (
          <New key={data.id} data={data} />
        )
      })}
    </Container>
  );
}

const SkeletonNew = () => {
  return (
    <Stack gap="6" maxW="3xl" width="full">
      <HStack width="full">
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton height="200px" />
    </Stack>
  )
}

const New = ({data} : {data: any} ) => {

  return (
    <Container className='flex w-full justify-between items-center mb-[60px]'>
      <SkeletonNew />
    </Container>
  );

  // return (
  //   <div key={data.id} className='flex justify-between items-center my-4'>
  //     <img src={data.image} alt={data.name} className='w-12 h-12 rounded-full' />
  //     <div>
  //       <h1>{data.name}</h1>
  //     </div>
  //     <div>
  //       <a
  //         href={data.link}
  //         target='_blank'
  //         rel='noreferrer noopener'
  //         className='text-blue-500'
  //         >
  //           {data.name}
  //       </a>
  //     </div>
  //   </div>
  // )
}

const Home = () => {

  return (
    <Container >
      <div className='text-3xl'>Home</div>
      <Balance />
      <News />
      <br />
    </Container>
  )
}

export default Home