-- Sample PostgreSQL database setup script

-- Create items table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price NUMERIC(10, 2),
  image_url TEXT,
  surprise TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO items (name, description, category, price, image_url, surprise, created_at) VALUES
('MacBook Pro 16-inch', 'Apple M3 Pro chip, 16GB RAM, 512GB SSD, Space Gray, 16.2-inch Liquid Retina XDR display with ProMotion technology.', 'electronics', 2499.99, 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=800', 'Free AirPods with purchase!', '2023-01-15T08:30:00Z'),
('iPhone 15 Pro', 'A17 Pro chip, 6.1-inch Super Retina XDR display, 48MP main camera, Titanium design, iOS 17, 256GB storage.', 'electronics', 999.99, 'https://images.pexels.com/photos/4071887/pexels-photo-4071887.jpeg?auto=compress&cs=tinysrgb&w=800', '3 months of Apple Music included', '2023-02-20T10:15:00Z'),
('The Cosmos: A Personal Voyage', 'Carl Sagan's comprehensive exploration of the universe, covering topics from astronomy to human civilization.', 'books', 19.99, 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800', 'Includes limited edition astronomy poster', '2023-03-10T14:45:00Z'),
('North Face Hiking Backpack', 'Durable 55L backpack with advanced suspension system, waterproof materials, and multiple compartments for all your outdoor adventures.', 'outdoor', 199.95, 'https://images.pexels.com/photos/1178527/pexels-photo-1178527.jpeg?auto=compress&cs=tinysrgb&w=800', 'Built-in hydration system', '2023-04-05T09:30:00Z'),
('Sony WH-1000XM5 Headphones', 'Industry-leading noise cancellation with 30-hour battery life, crystal clear audio, and comfortable design for all-day wear.', 'electronics', 399.99, 'https://images.pexels.com/photos/3394656/pexels-photo-3394656.jpeg?auto=compress&cs=tinysrgb&w=800', 'Custom EQ settings created by Grammy-winning producers', '2023-05-12T16:20:00Z'),
('Red Nike Air Max', 'Vibrant red athletic shoes with Air cushioning, perfect for casual wear or light exercise with superior comfort and style.', 'clothing', 129.99, 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800', 'Limited edition colorway', '2023-06-18T11:10:00Z'),
('Astronomy: The Definitive Guide', 'Comprehensive guide to space exploration with stunning imagery from the Hubble telescope and latest discoveries from space missions.', 'books', 24.95, 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg?auto=compress&cs=tinysrgb&w=800', 'Interactive AR star map included', '2023-07-22T13:40:00Z'),
('Coleman Sundome Tent', 'Easy setup 4-person tent with WeatherTec system keeping you dry from the ground up, perfect for family camping trips.', 'outdoor', 79.99, 'https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg?auto=compress&cs=tinysrgb&w=800', 'Built-in LED lighting system', '2023-08-15T15:25:00Z'),
('Samsung 55" QLED 4K Smart TV', 'Stunning 4K resolution with Quantum Dot technology, smart features, and multiple voice assistants for the ultimate home entertainment.', 'electronics', 799.99, 'https://images.pexels.com/photos/6316063/pexels-photo-6316063.jpeg?auto=compress&cs=tinysrgb&w=800', 'Gaming Mode with ultra-low latency', '2023-09-05T17:50:00Z'),
('Kindle Paperwhite', 'Waterproof e-reader with 300ppi glare-free display, weeks of battery life, and storage for thousands of books.', 'electronics', 149.99, 'https://images.pexels.com/photos/13908954/pexels-photo-13908954.jpeg?auto=compress&cs=tinysrgb&w=800', '3 months of Kindle Unlimited free', '2023-10-10T12:15:00Z'),
('Blue Levi\'s 501 Jeans', 'Classic straight fit denim jeans in medium blue wash with button fly and five-pocket styling, an American icon.', 'clothing', 69.50, 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800', 'Sustainable manufacturing process', '2023-11-20T09:05:00Z'),
('Cuisinart 10-Piece Cookware Set', 'Premium stainless steel cookware set with aluminum core for even heating and cool grip handles for stovetop to oven cooking.', 'home', 199.95, 'https://images.pexels.com/photos/5825576/pexels-photo-5825576.jpeg?auto=compress&cs=tinysrgb&w=800', 'Includes exclusive recipe book', '2023-12-05T14:30:00Z'),
('PlayStation 5 Digital Edition', 'Next-gen gaming console with lightning-fast loading, stunning 4K graphics, 3D audio, and innovative DualSense controller.', 'electronics', 399.99, 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800', 'One year of PlayStation Plus included', '2024-01-08T10:45:00Z'),
('Patagonia Down Sweater Jacket', 'Lightweight yet warm down jacket made with recycled materials and Fair Trade Certified sewing, perfect for cold weather adventures.', 'clothing', 229.00, 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800', 'Lifetime repair guarantee', '2024-02-15T11:20:00Z'),
('Bose QuietComfort Earbuds', 'True wireless noise cancelling earbuds with rich sound, comfortable fit, and touch controls for music and calls on the go.', 'electronics', 279.99, 'https://images.pexels.com/photos/8533226/pexels-photo-8533226.jpeg?auto=compress&cs=tinysrgb&w=800', 'Custom carrying case with built-in charger', '2024-03-22T16:55:00Z');
