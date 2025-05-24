-- Script to insert 1000 records into the real_estate_properties table
DO $$
BEGIN
    FOR i IN 1..1000 LOOP
        INSERT INTO real_estate_properties (
            name, 
            description, 
            location_city, 
            location_country, 
            number_of_floors, 
            number_of_rooms, 
            number_of_baths, 
            area_of_house, 
            area_of_garden, 
            price, 
            created_at, 
            updated_at
        )
        VALUES (
            'Property ' || i, -- Name
            'Description for property ' || i, -- Description
            CASE FLOOR(random() * 8 + 1)::INT
                WHEN 1 THEN 'New York'
                WHEN 2 THEN 'London'
                WHEN 3 THEN 'Paris'
                WHEN 4 THEN 'Tokyo'
                WHEN 5 THEN 'Berlin'
                WHEN 6 THEN 'Sydney'
                WHEN 7 THEN 'Toronto'
                ELSE 'Dubai'
            END, -- Random city
            CASE FLOOR(random() * 8 + 1)::INT
                WHEN 1 THEN 'USA'
                WHEN 2 THEN 'UK'
                WHEN 3 THEN 'France'
                WHEN 4 THEN 'Japan'
                WHEN 5 THEN 'Germany'
                WHEN 6 THEN 'Australia'
                WHEN 7 THEN 'Canada'
                ELSE 'UAE'
            END, -- Random country
            FLOOR(random() * 5 + 1)::INT, -- Random number of floors (1 to 5)
            FLOOR(random() * 10 + 1)::INT, -- Random number of rooms (1 to 10)
            FLOOR(random() * 5 + 1)::INT, -- Random number of baths (1 to 5)
            (random() * 300 + 50)::NUMERIC(10, 2), -- Random area of house (50 to 350 sqm)
            (random() * 500)::NUMERIC(10, 2), -- Random area of garden (0 to 500 sqm)
            (random() * 1000000 + 50000)::NUMERIC(15, 2), -- Random price (50,000 to 1,050,000)
            NOW() - (random() * INTERVAL '365 days'), -- Random created_at within the past year
            NOW() -- updated_at is the current time
        );
    END LOOP;
END $$;
