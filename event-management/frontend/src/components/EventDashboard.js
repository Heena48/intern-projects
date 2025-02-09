import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, List, ListItem, ListItemText, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Divider } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import EventForm from './EventForm';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    setShowCreateForm(true);
  };

  const handleEventCreated = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowCreateForm(false);
  };

  const handleEditEvent = (eventId) => {
    setCurrentEventId(eventId);
    setShowEditForm(true);
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvents(events.map(event => (event._id === updatedEvent._id ? updatedEvent : event)));
    setShowEditForm(false);
  };

  const handleDeleteEvent = (eventId) => {
    setCurrentEventId(eventId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:5000/events/${currentEventId}`);
      setEvents(events.filter(event => event._id !== currentEventId));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleClose = () => {
    setShowCreateForm(false);
    setShowEditForm(false);
    setShowDeleteConfirmation(false);
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
        <Dialog open={showCreateForm} onClose={handleClose}>
          <DialogTitle>Create Event</DialogTitle>
          <DialogContent>
            <EventForm onEventCreated={handleEventCreated} onClose={handleClose} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={showEditForm} onClose={handleClose}>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogContent>
            <EventForm eventId={currentEventId} onEventUpdated={handleEventUpdated} onClose={handleClose} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={showDeleteConfirmation} onClose={handleClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this event?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteEvent} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <List>
          {events.map((event, index) => (
            <React.Fragment key={event._id}>
              <ListItem>
                <ListItemText
                  primary={event.name}
                  secondary={`${new Date(event.datetime).toLocaleString()} - ${event.description}`}
                />
                <IconButton onClick={() => handleEditEvent(event._id)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteEvent(event._id)} color="secondary">
                  <Delete />
                </IconButton>
              </ListItem>
              {index < events.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default EventDashboard;