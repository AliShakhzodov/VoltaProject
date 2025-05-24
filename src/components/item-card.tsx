import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ItemType } from '@/types/item';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Heart, ExternalLink, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface ItemCardProps {
  item: ItemType;
}

export function ItemCard({ item }: ItemCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative">
          <AspectRatio ratio={4/3}>
            <img
              src={item.image_url}
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
        </div>
        
        <CardHeader className="pt-4 pb-2">
          <CardTitle className="text-xl font-semibold">{item.name}</CardTitle>
          <CardDescription className="text-sm opacity-90">
            {item.category}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {item.description}
          </p>
          
          <div className="mt-4">
            <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
            {item.surprise && (
              <div className="mt-2 text-sm p-2 bg-secondary rounded-md">
                <p className="font-medium">Surprise: {item.surprise}</p>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="pt-2">
          <div className="w-full flex gap-2">
            <Button 
              variant="default" 
              className="flex-1"
              size="sm"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="px-2"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}