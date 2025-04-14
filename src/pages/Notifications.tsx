import React from 'react';
import { Container, Notification } from '@mantine/core';

interface NotifyProp {
  title: string;
  message: string;
  alive: boolean;
}

const Notify = function Notify({ nt, onClose }: { nt: NotifyProp; onClose: () => void }) {
  return (
    <Notification title={nt.title} className="my-[10px]" onClose={onClose}>
      {nt.message}
    </Notification>
  );
};

const nots = [
  {
    title: "New Routine",
    message: "You have a new routine available",
    alive: true,
  },
  {
    title: "New Exercise",
    message: "You have a new exercise available",
    alive: true,
  },
  {
    title: "New Workout",
    message: "You have a new workout available",
    alive: true,
  },
];

const Notifications = () => {
  const [notList, setNotList] = React.useState<NotifyProp[]>([]);

  React.useEffect(() => {
    setNotList(nots.filter((not) => not.alive === true));
  }, []);

  const handleRemoveNotification = (title: string) => {
    setNotList((prevList) => prevList.filter((not) => not.title !== title));
  };

  return (
    <Container className='py-[100px]'>
      {notList.map((nt) => (
        <Notify
          key={nt.title}
          nt={nt}
          onClose={() => handleRemoveNotification(nt.title)}
        />
      ))}
    </Container>
  );
};

export default Notifications;
