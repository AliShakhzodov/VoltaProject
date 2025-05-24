import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Create a pool of connections to the PostgreSQL database
// In a real application, you would use environment variables for these values

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});
/**
 * Execute a SQL query against the database
 * @param {string} sqlQuery - The SQL query to execute
 * @returns {Promise<Array>} Array of results
 */
export async function searchDatabase(sqlQuery) {
  let client;
  try {
    console.log("Executing SQL query:", sqlQuery);

    // Get a client from the pool
    client = await pool.connect();

    // Execute the SQL query
    const result = await client.query(sqlQuery);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Failed to execute database query");
  } finally {
    // Release the client back to the pool
    if (client) {
      client.release();
    }
  }
}

/**
 * Gracefully shut down the database connection pool
 */
export async function closeDatabaseConnection() {
  try {
    await pool.end();
    console.log("Database connection pool has been closed.");
  } catch (error) {
    console.error("Error closing the database connection pool:", error);
  }
}

/**
 * Execute a SQL query against the database
 * @param {string} sqlQuery - The SQL query to execute
 * @returns {Promise<Array>} Array of results
 */
export async function searchDatabaseOld(sqlQuery) {
  try {
    console.log("Executing SQL query:", sqlQuery);

    // In a real application, you would execute the SQL query against PostgreSQL:
    /*
    const result = await pool.query(sqlQuery);
    return result.rows;
    */

    // For demonstration purposes, we'll simulate query execution on our sample data
    return simulateQueryExecution(sqlQuery);
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Failed to execute database query");
  }
}

/**
 * Simulate SQL query execution on sample data
 * This is a simplified version for demonstration purposes
 */
function simulateQueryExecution(sqlQuery) {
  const lowerSqlQuery = sqlQuery.toLowerCase();

  // Parse the WHERE clause if it exists
  let filteredItems = [...sampleItems];

  // Handle category filter
  if (lowerSqlQuery.includes("category =")) {
    const categoryMatch = lowerSqlQuery.match(/category = '([^']+)'/);
    if (categoryMatch && categoryMatch[1]) {
      const category = categoryMatch[1];
      filteredItems = filteredItems.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase(),
      );
    }
  }

  // Handle price filters
  if (lowerSqlQuery.includes("price <")) {
    const priceMatch = lowerSqlQuery.match(/price < (\d+)/);
    if (priceMatch && priceMatch[1]) {
      const priceLimit = parseInt(priceMatch[1]);
      filteredItems = filteredItems.filter((item) => item.price < priceLimit);
    }
  } else if (lowerSqlQuery.includes("price >")) {
    const priceMatch = lowerSqlQuery.match(/price > (\d+)/);
    if (priceMatch && priceMatch[1]) {
      const priceLimit = parseInt(priceMatch[1]);
      filteredItems = filteredItems.filter((item) => item.price > priceLimit);
    }
  }

  // Handle name/description search terms
  if (lowerSqlQuery.includes("ilike")) {
    // Extract search terms from the SQL query
    const searchTermMatches = lowerSqlQuery.match(/(['"])%([^%]+)%\1/g);

    if (searchTermMatches) {
      const searchTerms = searchTermMatches.map((term) =>
        term.replace(/(['"])%|%\1/g, "").toLowerCase(),
      );

      filteredItems = filteredItems.filter((item) => {
        // Check if any search term is in the name or description
        return searchTerms.some(
          (term) =>
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term),
        );
      });
    }
  }

  // Handle LIMIT clause
  if (lowerSqlQuery.includes("limit")) {
    const limitMatch = lowerSqlQuery.match(/limit (\d+)/);
    if (limitMatch && limitMatch[1]) {
      const limit = parseInt(limitMatch[1]);
      filteredItems = filteredItems.slice(0, limit);
    }
  }

  // Add a small delay to simulate database query time
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filteredItems);
    }, 500);
  });
}

