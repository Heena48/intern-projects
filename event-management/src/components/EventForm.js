import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventsData from '../data/events.json';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: eventsData.length + 1,
      name: eventName,
      description: eventDescription,
      date: eventDate,
    };
    eventsData.push(newEvent);
    console.log('Event created:', newEvent);
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Event Date"
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Event
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EventForm;