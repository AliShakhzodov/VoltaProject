-- SQL
CREATE TABLE real_estate_properties (
    id SERIAL PRIMARY KEY, -- Unique identifier for each property
    name VARCHAR(255) NOT NULL, -- Name of the property
    description TEXT, -- Description of the property
    location_city VARCHAR(100) NOT NULL, -- City where the property is located
    location_country VARCHAR(100) NOT NULL, -- Country where the property is located
    number_of_floors INT CHECK (number_of_floors >= 0), -- Number of floors in the property
    number_of_rooms INT CHECK (number_of_rooms >= 0), -- Number of rooms in the property
    number_of_baths INT CHECK (number_of_baths >= 0), -- Number of bathrooms in the property
    area_of_house DECIMAL(10, 2) CHECK (area_of_house > 0), -- Area of the house in square meters
    area_of_garden DECIMAL(10, 2) CHECK (area_of_garden >= 0), -- Area of the garden in square meters (optional)
    price DECIMAL(15, 2) CHECK (price > 0), -- Price of the property
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the property was added
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for the last update
);

-- Create a trigger function to update the `updated_at` column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function before any update
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON real_estate_properties
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
