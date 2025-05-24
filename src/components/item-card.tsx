import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ItemType } from '@/types/item';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Heart, MapPin, Home, Ruler, Bath, BedDouble } from 'lucide-react';
import { motion } from 'framer-motion';

interface ItemCardProps {
  item: ItemType;
}

export function ItemCard({ item }: ItemCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative">
          <AspectRatio ratio={16/9}>
            <img
              src={`https://images.pexels.com/photos/${1396122 + item.id}/pexels-photo-${1396122 + item.id}.jpeg?auto=compress&cs=tinysrgb&w=800`}
              alt={item.name}
              className="object-cover h-full w-full"
            />
          </AspectRatio>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full h-8 w-8"
            onClick={toggleLike}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
            <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
          </div>
        </div>
        
        <CardHeader className="pt-4 pb-2">
          <CardTitle className="text-xl font-semibold line-clamp-1">{item.name}</CardTitle>
          <CardDescription className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4" />
            {item.location_city}, {item.location_country}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {item.description}
          </p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>{item.number_of_floors} floors</span>
            </div>
            <div className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" />
              <span>{item.number_of_rooms} rooms</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{item.number_of_baths} baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Ruler className="h-4 w-4" />
              <span>{item.area_of_house}m²</span>
            </div>
          </div>
          
          {item.area_of_garden && (
            <div className="mt-2 text-sm p-2 bg-secondary rounded-md">
              <p className="font-medium">Garden area: {item.area_of_garden}m²</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-2">
          <Button 
            variant="default" 
            className="w-full"
            size="sm"
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}