import React, { useEffect, useState } from 'react';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Event() {
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);
  return (
    <>
      <h1>Events</h1>
      {events?.map((event) => (
        <EventCard game={event.game} description={event.description} date={event.date} time={event.time} />
      ))}
    </>
  );
}

export default Event;
