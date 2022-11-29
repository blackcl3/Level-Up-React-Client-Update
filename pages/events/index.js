import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Event() {
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);
  return (
    <>
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Game
      </Button>
      {events?.map((event) => (
        <EventCard id={event.id} game={event.game} description={event.description} date={event.date} time={event.time} />
      ))}
    </>
  );
}

export default Event;
