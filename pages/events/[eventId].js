import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EventCard from '../../components/event/EventCard';
import { useAuth } from '../../utils/context/authContext';
import { getEventById } from '../../utils/data/eventData';

export default function EventDetailPage() {
  const [event, setEvent] = useState({});
  const router = useRouter();
  const { eventId } = router.query;
  const { user } = useAuth();

  const getEvent = () => {
    getEventById(eventId).then(setEvent);
  };

  useEffect(() => {
    getEvent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <EventCard game={event.game} description={event.description} date={event.date} time={event.time} user={user} onChange={getEvent} />
    </div>
  );
}
