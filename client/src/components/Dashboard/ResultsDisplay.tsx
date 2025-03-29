import { useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { QueryResult } from "../../types";

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  results: QueryResult | null;
}

export default function ResultsDisplay({ isLoading, error, results }: ResultsDisplayProps) {
  const renderChart = () => {
    if (!results || !results.data) return null;

    // Choose chart type based on the results
    if (results.chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={results.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000)}k`}
            />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#6366F1" 
              strokeWidth={2} 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={results.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000)}k`}
            />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
            <Legend />
            <Bar dataKey="value" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Results</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: "-0.32s" }}></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: "-0.16s" }}></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
            </div>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error processing your query</AlertTitle>
            <AlertDescription>
              {error || "We couldn't understand the query. Please try rephrasing or use one of the suggested queries."}
            </AlertDescription>
          </Alert>
        ) : results ? (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-1">{results.title}</h3>
              <p className="text-sm text-gray-500">{results.subtitle}</p>
            </div>
            
            {renderChart()}
            
            <Separator className="my-4" />
            
            <div className="text-sm text-gray-500">
              <p className="font-medium">Key Insights:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {results.insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-400">
            <p>Enter a query to see results</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
