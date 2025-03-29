import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setQuery } from "../../store/querySlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

interface QueryInputProps {
  onSubmitQuery: () => void;
  onSelectSuggestion: (suggestion: string) => void;
}

const SUGGESTIONS = [
  "Show me sales trends for the last quarter",
  "Compare revenue by region in 2023",
  "What products had the highest growth rate?",
  "Show customer acquisition cost by channel",
  "Analyze conversion rates by marketing campaign"
];

const QUERY_TAGS = ["Sales trends", "Revenue by region", "Product growth", "Customer acquisition"];

export default function QueryInput({ onSubmitQuery, onSelectSuggestion }: QueryInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentQuery = useSelector((state: RootState) => state.query.currentQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmitQuery();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSelectSuggestion(suggestion);
    setShowSuggestions(false);
  };

  const handleTagClick = (tag: string) => {
    onSelectSuggestion(tag);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-3">Ask a question about your data</h2>
        <div className="relative">
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              ref={inputRef}
              type="text"
              className="pl-10 pr-10 py-6"
              placeholder="E.g., Show me sales trends for the last quarter..."
              value={currentQuery}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <Button
                onClick={onSubmitQuery}
                className="h-8 w-8 rounded-full p-0"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Suggestions dropdown */}
          {showSuggestions && (
            <div 
              ref={suggestionsRef}
              className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm"
            >
              {SUGGESTIONS.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap mt-3 -mx-1">
          {QUERY_TAGS.map((tag, index) => (
            <span
              key={index}
              className="m-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
