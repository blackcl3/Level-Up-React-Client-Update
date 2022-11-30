import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import {
  deleteEvent, getEvents, leaveEvent, joinEvent,
} from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Event() {
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  const router = useRouter();

  function getPageContent() {
    getEvents(user.uid).then((data) => setEvents(data));
  }

  useEffect(() => {
    getPageContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      ;
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
              deleteEvent(event.id).then(() => {
                getPageContent();
              });
            }}
          >
            Delete
          </Button>
          {event.joined ? (
            <Button
              variant="warning"
              onClick={() => {
                leaveEvent(event.id, { user_id: user.uid }).then(() => {
                  getPageContent();
                });
              }}
            >
              Leave
            </Button>
          ) : (
            <Button
              onClick={() => {
                joinEvent(event.id, { user_id: user.uid }).then(() => {
                  getPageContent();
                });
              }}
            >
              Sign Up
            </Button>
          )}
        </section>
      ))}
    </>
  );
}

export default Event;
