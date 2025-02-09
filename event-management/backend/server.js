const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Use PORT environment variable or default to 3000

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://heenahussain696:PritHdAdbQ3qME08@intern.37zwx.mongodb.net/eventdb?retryWrites=true&w=majority&appName=intern&authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

const eventSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  description: { type: String, required: true },
  location: { type: String, required: true },
  name: { type: String, required: true },
  datetime: { type: Date, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);

// Create a new event
app.post('/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Read all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Read a single event by ID
app.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Error fetching event' });
  }
});

// Update an event by ID
app.put('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Delete an event by ID
app.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});