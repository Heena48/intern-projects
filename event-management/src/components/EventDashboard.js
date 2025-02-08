import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventsData from '../data/events.json';
import { Container, Typography, Button, List, ListItem, ListItemText, Box } from '@mui/material';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Event Dashboard
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCreateEvent}>
          Create Event
        </Button>
        <List>
          {events.map(event => (
            <ListItem key={event.id}>
              <ListItemText primary={event.name} secondary={event.date} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default EventDashboard;