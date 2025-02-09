import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const EventForm = ({ eventId, onEventUpdated, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [datetime, setDatetime] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${eventId}`);
        const event = response.data;
        setName(event.name);
        setDescription(event.description);
        setLocation(event.location);
        setDatetime(new Date(event.datetime).toISOString().slice(0, 16));
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = { name, description, location, datetime };
      const response = await axios.put(`http://localhost:5000/events/${eventId}`, updatedEvent);
      onEventUpdated(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={3}>
      <TextField
        label="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Date and Time"
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Update Event
      </Button>
    </Box>
  );
};

export default EventForm;