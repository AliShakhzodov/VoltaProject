import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { processSearchQuery } from './ai-service.js';
import { searchDatabase } from './db-service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: '*' }));

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Search API endpoint
app.post('/api/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    console.log('Received search query:', query);
    
    // Process the natural language query using AI to convert to SQL
    const sqlQuery = await processSearchQuery(query);
    console.log('Generated SQL query:', sqlQuery);
    
    // Execute the SQL query against the database
    const results = await searchDatabase(sqlQuery);
    
    // Return the search results
    res.json(results);
  } catch (error) {
    console.error('Error processing search:', error);
    res.status(500).json({ 
      error: 'An error occurred while processing your search',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});