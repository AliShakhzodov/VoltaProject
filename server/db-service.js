import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a pool of connections to the PostgreSQL database
// In a real application, you would use environment variables for these values

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});


// For demonstration purposes, we'll use an in-memory database
const sampleItems = [
  {
    id: 1,
    name: "MacBook Pro 16-inch",
    description: "Apple M3 Pro chip, 16GB RAM, 512GB SSD, Space Gray, 16.2-inch Liquid Retina XDR display with ProMotion technology.",
    category: "electronics",
    price: 2499.99,
    image_url: "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Free AirPods with purchase!",
    created_at: "2023-01-15T08:30:00Z"
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    description: "A17 Pro chip, 6.1-inch Super Retina XDR display, 48MP main camera, Titanium design, iOS 17, 256GB storage.",
    category: "electronics",
    price: 999.99,
    image_url: "https://images.pexels.com/photos/4071887/pexels-photo-4071887.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "3 months of Apple Music included",
    created_at: "2023-02-20T10:15:00Z"
  },
  {
    id: 3,
    name: "The Cosmos: A Personal Voyage",
    description: "Carl Sagan's comprehensive exploration of the universe, covering topics from astronomy to human civilization.",
    category: "books",
    price: 19.99,
    image_url: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Includes limited edition astronomy poster",
    created_at: "2023-03-10T14:45:00Z"
  },
  {
    id: 4,
    name: "North Face Hiking Backpack",
    description: "Durable 55L backpack with advanced suspension system, waterproof materials, and multiple compartments for all your outdoor adventures.",
    category: "outdoor",
    price: 199.95,
    image_url: "https://images.pexels.com/photos/1178527/pexels-photo-1178527.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Built-in hydration system",
    created_at: "2023-04-05T09:30:00Z"
  },
  {
    id: 5,
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancellation with 30-hour battery life, crystal clear audio, and comfortable design for all-day wear.",
    category: "electronics",
    price: 399.99,
    image_url: "https://images.pexels.com/photos/3394656/pexels-photo-3394656.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Custom EQ settings created by Grammy-winning producers",
    created_at: "2023-05-12T16:20:00Z"
  },
  {
    id: 6,
    name: "Red Nike Air Max",
    description: "Vibrant red athletic shoes with Air cushioning, perfect for casual wear or light exercise with superior comfort and style.",
    category: "clothing",
    price: 129.99,
    image_url: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Limited edition colorway",
    created_at: "2023-06-18T11:10:00Z"
  },
  {
    id: 7,
    name: "Astronomy: The Definitive Guide",
    description: "Comprehensive guide to space exploration with stunning imagery from the Hubble telescope and latest discoveries from space missions.",
    category: "books",
    price: 24.95,
    image_url: "https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Interactive AR star map included",
    created_at: "2023-07-22T13:40:00Z"
  },
  {
    id: 8,
    name: "Coleman Sundome Tent",
    description: "Easy setup 4-person tent with WeatherTec system keeping you dry from the ground up, perfect for family camping trips.",
    category: "outdoor",
    price: 79.99,
    image_url: "https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Built-in LED lighting system",
    created_at: "2023-08-15T15:25:00Z"
  },
  {
    id: 9,
    name: "Samsung 55\" QLED 4K Smart TV",
    description: "Stunning 4K resolution with Quantum Dot technology, smart features, and multiple voice assistants for the ultimate home entertainment.",
    category: "electronics",
    price: 799.99,
    image_url: "https://images.pexels.com/photos/6316063/pexels-photo-6316063.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Gaming Mode with ultra-low latency",
    created_at: "2023-09-05T17:50:00Z"
  },
  {
    id: 10,
    name: "Kindle Paperwhite",
    description: "Waterproof e-reader with 300ppi glare-free display, weeks of battery life, and storage for thousands of books.",
    category: "electronics",
    price: 149.99,
    image_url: "https://images.pexels.com/photos/13908954/pexels-photo-13908954.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "3 months of Kindle Unlimited free",
    created_at: "2023-10-10T12:15:00Z"
  },
  {
    id: 11,
    name: "Blue Levi's 501 Jeans",
    description: "Classic straight fit denim jeans in medium blue wash with button fly and five-pocket styling, an American icon.",
    category: "clothing",
    price: 69.50,
    image_url: "https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Sustainable manufacturing process",
    created_at: "2023-11-20T09:05:00Z"
  },
  {
    id: 12,
    name: "Cuisinart 10-Piece Cookware Set",
    description: "Premium stainless steel cookware set with aluminum core for even heating and cool grip handles for stovetop to oven cooking.",
    category: "home",
    price: 199.95,
    image_url: "https://images.pexels.com/photos/5825576/pexels-photo-5825576.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Includes exclusive recipe book",
    created_at: "2023-12-05T14:30:00Z"
  },
  {
    id: 13,
    name: "PlayStation 5 Digital Edition",
    description: "Next-gen gaming console with lightning-fast loading, stunning 4K graphics, 3D audio, and innovative DualSense controller.",
    category: "electronics",
    price: 399.99,
    image_url: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "One year of PlayStation Plus included",
    created_at: "2024-01-08T10:45:00Z"
  },
  {
    id: 14,
    name: "Patagonia Down Sweater Jacket",
    description: "Lightweight yet warm down jacket made with recycled materials and Fair Trade Certified sewing, perfect for cold weather adventures.",
    category: "clothing",
    price: 229.00,
    image_url: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Lifetime repair guarantee",
    created_at: "2024-02-15T11:20:00Z"
  },
  {
    id: 15,
    name: "Bose QuietComfort Earbuds",
    description: "True wireless noise cancelling earbuds with rich sound, comfortable fit, and touch controls for music and calls on the go.",
    category: "electronics",
    price: 279.99,
    image_url: "https://images.pexels.com/photos/8533226/pexels-photo-8533226.jpeg?auto=compress&cs=tinysrgb&w=800",
    surprise: "Custom carrying case with built-in charger",
    created_at: "2024-03-22T16:55:00Z"
  }
];

/**
 * Execute a SQL query against the database
 * @param {string} sqlQuery - The SQL query to execute
 * @returns {Promise<Array>} Array of results
 */
export async function searchDatabase(sqlQuery) {
  try {
    console.log('Executing SQL query:', sqlQuery);
    
    // In a real application, you would execute the SQL query against PostgreSQL:
    /*
    const result = await pool.query(sqlQuery);
    return result.rows;
    */
    
    // For demonstration purposes, we'll simulate query execution on our sample data
    return simulateQueryExecution(sqlQuery);
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Failed to execute database query');
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
  if (lowerSqlQuery.includes('category =')) {
    const categoryMatch = lowerSqlQuery.match(/category = '([^']+)'/);
    if (categoryMatch && categoryMatch[1]) {
      const category = categoryMatch[1];
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
  }
  
  // Handle price filters
  if (lowerSqlQuery.includes('price <')) {
    const priceMatch = lowerSqlQuery.match(/price < (\d+)/);
    if (priceMatch && priceMatch[1]) {
      const priceLimit = parseInt(priceMatch[1]);
      filteredItems = filteredItems.filter(item => item.price < priceLimit);
    }
  } else if (lowerSqlQuery.includes('price >')) {
    const priceMatch = lowerSqlQuery.match(/price > (\d+)/);
    if (priceMatch && priceMatch[1]) {
      const priceLimit = parseInt(priceMatch[1]);
      filteredItems = filteredItems.filter(item => item.price > priceLimit);
    }
  }
  
  // Handle name/description search terms
  if (lowerSqlQuery.includes('ilike')) {
    // Extract search terms from the SQL query
    const searchTermMatches = lowerSqlQuery.match(/(['"])%([^%]+)%\1/g);
    
    if (searchTermMatches) {
      const searchTerms = searchTermMatches.map(term => 
        term.replace(/(['"])%|%\1/g, '').toLowerCase()
      );
      
      filteredItems = filteredItems.filter(item => {
        // Check if any search term is in the name or description
        return searchTerms.some(term => 
          item.name.toLowerCase().includes(term) || 
          item.description.toLowerCase().includes(term)
        );
      });
    }
  }
  
  // Handle LIMIT clause
  if (lowerSqlQuery.includes('limit')) {
    const limitMatch = lowerSqlQuery.match(/limit (\d+)/);
    if (limitMatch && limitMatch[1]) {
      const limit = parseInt(limitMatch[1]);
      filteredItems = filteredItems.slice(0, limit);
    }
  }
  
  // Add a small delay to simulate database query time
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(filteredItems);
    }, 500);
  });
}