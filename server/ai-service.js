import Groq from "groq-sdk";
import dotenv from "dotenv";

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
          The database has a table named "real_estate_properties" with the following columns:
          - id (integer, primary key)
          - name (text, not null)
          - description (text)
          - location_city (text, not null)
          - location_country (text, not null)
          - number_of_floors (integer, must be >= 0)
          - number_of_rooms (integer, must be >= 0)
          - number_of_baths (integer, must be >= 0)
          - area_of_house (numeric, must be > 0)
          - area_of_garden (numeric, optional, must be >= 0)
          - price (numeric, must be > 0)
          - created_at (timestamp, default to current timestamp)
          - updated_at (timestamp, default to current timestamp)
          
          Respond ONLY with a valid PostgreSQL query. Do not include any explanations.
          Do not format the SQL query and only give the plain text query. Do not format it for markdown.
          Always include LIMIT 9 at the end of queries to prevent too many results.
          Use ILIKE for case-insensitive text matching. If the user asks for size, big is bigger than 150 and small is less than 149.
          ONLY return SELECT queries. `,
        },
        {
          role: "user",
          content: query,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 150,
      top_p: 1,
      stream: false,
    });

    const sqlQuery = completion.choices[0]?.message?.content?.trim();

    if (!sqlQuery) {
      throw new Error("Failed to generate SQL query");
    }

    // Ensure the query has a LIMIT clause
    if (!sqlQuery.toLowerCase().includes("limit")) {
      return `${sqlQuery} LIMIT 9;`;
    }

    return sqlQuery;
  } catch (error) {
    console.error("Error processing query with Groq:", error);
    throw new Error("Failed to process natural language query");
  }
}

