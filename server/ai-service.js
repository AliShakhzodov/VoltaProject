import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Process a natural language query and convert it to a SQL query
 * @param {string} query - Natural language query from the user
 * @returns {Promise<string>} SQL query to execute
 */
export async function processSearchQuery(query) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that converts natural language queries to SQL. 
          The database has a table named "items" with the following columns:
          - id (integer)
          - name (text)
          - description (text)
          - category (text)
          - price (numeric)
          - image_url (text)
          - surprise (text)
          - created_at (timestamp)
          
          Respond ONLY with a valid PostgreSQL query. Do not include any explanations.
          Always include LIMIT 9 at the end of queries to prevent too many results.
          Use ILIKE for case-insensitive text matching.`
        },
        {
          role: "user",
          content: query
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 150,
      top_p: 1,
      stream: false,
    });

    const sqlQuery = completion.choices[0]?.message?.content?.trim();
    
    if (!sqlQuery) {
      throw new Error('Failed to generate SQL query');
    }

    // Ensure the query has a LIMIT clause
    if (!sqlQuery.toLowerCase().includes('limit')) {
      return `${sqlQuery} LIMIT 9;`;
    }

    return sqlQuery;
  } catch (error) {
    console.error('Error processing query with Groq:', error);
    throw new Error('Failed to process natural language query');
  }
}