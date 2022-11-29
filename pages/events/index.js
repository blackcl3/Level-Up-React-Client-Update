import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { deleteEvent, getEvents } from '../../utils/data/eventData';

function Event() {
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([]);

  const router = useRouter();

  function getPageContent() {
    getEvents().then((data) => setEvents(data));
  }

  useEffect(() => {
    getPageContent();
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
      </Button>;
      {events?.map((event) => (
        <section key={`event--${event.id}`}>
          <EventCard id={event.id} game={event.game} description={event.description} date={event.date} time={event.time} />
          <Button
            onClick={() => {
              router.push(`/events/edit/${event.id}`);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteEvent(event.id).then(() => { getPageContent(); });
            }}
          >Delete
          </Button>
        </section>
      ))}
    </>
  );
}

export default Event;
