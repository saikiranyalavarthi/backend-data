// Import necessary libraries/modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create an instance of Express app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0/nudgeDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Create a Nudge schema and model
const nudgeSchema = new mongoose.Schema({
  event_id: { type: String, required: true },
  title: { type: String, required: true },
  cover_image: { type: String },
  nudge_time: { type: Date, required: true },
  description: { type: String, required: true },
  icon: { type: String },
  invitation: { type: String }
});

const Nudge = mongoose.model('Nudge', nudgeSchema);

// API Endpoint: Create a new nudge
app.post('/nudges', (req, res) => {
  const { event_id, title, cover_image, nudge_time, description, icon, invitation } = req.body;
  
  const newNudge = new Nudge({
    event_id,
    title,
    cover_image,
    nudge_time,
    description,
    icon,
    invitation
  });
  
  newNudge.save()
    .then(() => res.status(200).json({ message: 'Nudge created successfully' }))
    .catch(err => res.status(500).json({ error: 'Failed to create nudge' }));
});

// API Endpoint: Update an existing nudge
app.put('/nudges/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  Nudge.findByIdAndUpdate(id, updatedData)
    .then(() => res.status(200).json({ message: 'Nudge updated successfully' }))
    .catch(err => res.status(500).json({ error: 'Failed to update nudge' }));
});

// API Endpoint: Delete an existing nudge
app.delete('/nudges/:id', (req, res) => {
  const { id } = req.params;

  Nudge.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: 'Nudge deleted successfully' }))
    .catch(err => res.status(500).json({ error: 'Failed to delete nudge' }));
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
