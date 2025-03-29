import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Link } from "wouter";
import { ArrowLeft, Clock } from "lucide-react";
import QueryHistory from "@/components/Dashboard/QueryHistory";
import { executeQuery, selectSuggestion } from "@/store/querySlice";

export default function HistoryPage() {
  const dispatch = useDispatch();

  const handleRerunQuery = (query: string) => {
    dispatch(selectSuggestion(query));
    dispatch(executeQuery(query) as any);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="flex items-center mb-8">
          <Clock className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Query History</h1>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500 mb-6">
            View and rerun your past queries. Click on any query to use it again.
          </p>
          
          <QueryHistory onRerunQuery={handleRerunQuery} />
        </div>
      </div>
    </div>
  );
}