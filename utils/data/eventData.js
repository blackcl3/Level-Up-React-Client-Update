import axios from 'axios';
import { clientCredentials } from '../client';

const getEvents = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getEventById = (id) => new Promise((resolve, reject) => {
  axios.get(`${clientCredentials.databaseURL}/events/${id}`)
    .then((response) => (response.data))
    .then((data) => {
      resolve(({
        id: data.id,
        date: data.date,
        time: data.time,
        game: data.game,
        organizerId: data.organizer_id,
      }));
    })
    .catch(reject);
});

const createEvent = (event, user) => new Promise((resolve, reject) => {
  const eventObj = {
    date: event.date,
    time: event.time,
    game: event.game,
    organizer_id: user.uid,
  };
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventObj),
  })
    .then(resolve)
    .catch(reject);
});

const updateEvent = (user, event, id) => new Promise((resolve, reject) => {
  const eventObj = {
    date: event.date,
    time: event.time,
    game: event.game,
    organizer_id: user.uid,
  };
  axios.put(`${clientCredentials.databaseURL}/events/${id}`, eventObj)
    .then(resolve)
    .catch(reject);
});

const deleteEvent = (id) => new Promise((resolve, reject) => {
  axios.delete(`${clientCredentials.databaseURL}/events/${id}`)
    .then(resolve)
    .catch(reject);
});

const leaveEvent = (eventId, user) => new Promise((resolve, reject) => {
  axios.delete(`${clientCredentials.databaseURL}/events/${eventId}/leave`, { data: user }).then(resolve).catch(reject);
});

const joinEvent = (eventId, user) => new Promise((resolve, reject) => {
  axios.post(`${clientCredentials.databaseURL}/events/${eventId}/signup`, user).then(resolve).catch(reject);
});

export {
  getEvents, getEventById, createEvent, updateEvent, deleteEvent, leaveEvent, joinEvent,
};
