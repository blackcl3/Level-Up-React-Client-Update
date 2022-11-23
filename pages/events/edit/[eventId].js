import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EventForm from '../../../components/event/EventForm';
import { useAuth } from '../../../utils/context/authContext';
import { getEventById } from '../../../utils/data/eventData';

export default function EditEventPage() {
  const [event, setEvent] = useState({});
  const router = useRouter();
  const { eventId } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getEventById(eventId).then(setEvent);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <EventForm obj={event} user={user} />
    </div>
  );
}
