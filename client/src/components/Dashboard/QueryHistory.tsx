import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface QueryHistoryProps {
  onRerunQuery: (query: string) => void;
}

export default function QueryHistory({ onRerunQuery }: QueryHistoryProps) {
  const { history } = useSelector((state: RootState) => state.query);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Query History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No queries yet</p>
            </div>
          ) : (
            history.map((query, index) => (
              <div 
                key={index}
                className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition cursor-pointer"
                onClick={() => onRerunQuery(query.text)}
              >
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">{query.text}</p>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6 text-gray-400 hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRerunQuery(query.text);
                    }}
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">{formatTimestamp(query.timestamp)}</p>
              </div>
            ))
          )}
        </div>
        
        {history.length > 0 && (
          <div className="mt-4 text-center">
            <Button variant="link" className="text-sm">
              View All History
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
