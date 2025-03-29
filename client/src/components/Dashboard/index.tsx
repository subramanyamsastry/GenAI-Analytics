import { useState, useEffect } from "react";
import Sidebar from "../Layout/Sidebar";
import Topbar from "../Layout/Topbar";
import DashboardHeader from "./DashboardHeader";
import QueryInput from "./QueryInput";
import ResultsDisplay from "./ResultsDisplay";
import QueryHistory from "./QueryHistory";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { executeQuery, selectSuggestion } from "../../store/querySlice";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Dashboard() {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const dispatch = useDispatch();
  const { currentQuery, isLoading, error, results } = useSelector(
    (state: RootState) => state.query
  );

  useEffect(() => {
    setShowSidebar(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSubmitQuery = () => {
    if (currentQuery.trim()) {
      dispatch(executeQuery(currentQuery));
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    dispatch(selectSuggestion(suggestion));
  };

  const handleRerunQuery = (query: string) => {
    dispatch(selectSuggestion(query));
    dispatch(executeQuery(query));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {showSidebar && <Sidebar />}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50 p-4 md:p-6">
          <DashboardHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-3">
              <QueryInput 
                onSubmitQuery={handleSubmitQuery} 
                onSelectSuggestion={handleSelectSuggestion}
              />
            </div>
            
            <div className="lg:col-span-2">
              <ResultsDisplay 
                isLoading={isLoading} 
                error={error} 
                results={results}
              />
            </div>
            
            <div className="lg:col-span-1">
              <QueryHistory onRerunQuery={handleRerunQuery} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
