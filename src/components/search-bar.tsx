import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const exampleQueries = [
    "Show me houses under $500,000",
    "Find properties with a garden in New York",
    "Houses with 3 or more bedrooms",
    "Properties with at least 2 bathrooms in London"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center relative rounded-lg bg-muted/50 border px-4 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
          <Search className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What kind of property are you looking for?"
            className="flex-1 border-0 bg-transparent p-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isLoading}
          />
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-2"
              >
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="search-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button 
                  type="submit" 
                  size="sm" 
                  className="ml-2"
                  disabled={!query.trim() || isLoading}
                >
                  Search
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {exampleQueries.map((example, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              setQuery(example);
              onSearch(example);
            }}
            disabled={isLoading}
          >
            {example}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}