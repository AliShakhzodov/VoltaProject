import { useState } from 'react';
import { SearchBar } from '@/components/search-bar';
import { SearchResults } from '@/components/search-results';
import { ThemeToggle } from '@/components/theme-toggle';
import { ItemType } from '@/types/item';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Building } from 'lucide-react';

export function SearchPage() {
  const [results, setResults] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a search query",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setResults([]);

    try {
      const response = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error performing search:', error);
      toast({
        title: "Search failed",
        description: "There was an error processing your search. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="flex justify-end mb-6">
        <ThemeToggle />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 mt-8 md:mt-16"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building className="h-12 w-12" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Property Search
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find your perfect property using our intelligent search. Just describe what you're looking for in natural language.
        </p>
      </motion.div>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      
      <SearchResults results={results} isLoading={isLoading} />
    </div>
  );
}