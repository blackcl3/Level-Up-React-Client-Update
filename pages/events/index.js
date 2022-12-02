import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import {
  getEvents,
} from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Event() {
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  const router = useRouter();

  const getPageContent = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };

  useEffect(() => {
    getPageContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);
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
      ;
      {events?.map((event) => (
        <section key={`event--${event.id}`}>
          <EventCard user={user} id={event.id} game={event.game} description={event.description} date={event.date} time={event.time} onUpdate={getPageContent} joined={event.joined} />
        </section>
      ))}
    </>
  );
}

export default Event;
