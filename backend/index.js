const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const Company = require('./models/Company');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cat', { // Replace 'your-db-name' with your actual DB name
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connection established'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get all companies from the database
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).send('Error getting companies: ' + error.message);
  }
});

// Search endpoint to prioritize location
app.get('/api/companies/search', async (req, res) => {
  const { type, location } = req.query;
  try {
    const query = {};
    if (type) query.type = type;
    
    let companies = await Company.find(query);

    if (location) {
      companies = companies.sort((a, b) => {
        // Sorting logic here, you may want to implement more complex logic
        return a.location === location ? -1 : b.location === location ? 1 : 0;
      });
    }

    res.status(200).json(companies);
  } catch (error) {
    res.status(400).send('Error searching companies: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
