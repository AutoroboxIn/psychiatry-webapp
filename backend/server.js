const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Setup Express app
const app = express();

// Middleware to parse JSON data
app.use(cors());
app.use(express.json());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/psychiatryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Define Schema and Model for Patient Data
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  symptoms: String,
  duration: Number,
  severity: Number,
  sleepPattern: String,
  appetiteChanges: String,
  thoughtsOfDeath: String,
  concentrationIssues: String,
});

const Patient = mongoose.model('Patient', patientSchema);

// Endpoint to handle form submission
app.post('/api/submit', async (req, res) => {
  try {
    const patientData = new Patient(req.body);
    await patientData.save();
    res.status(201).json({ message: 'Patient data saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving data', error: err });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
