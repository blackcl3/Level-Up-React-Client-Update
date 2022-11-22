import React from 'react';
import EventForm from '../../components/event/EventForm';
import { useAuth } from '../../utils/context/authContext';

export default function NewEventPage() {
  const { user } = useAuth();
  return (
    <><h1>Add New Event</h1><EventForm user={user} /></>
  );
}
