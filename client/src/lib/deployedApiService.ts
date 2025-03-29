// This is a mock API service for the deployed version (Netlify)
import { QueryResult } from '../types';
import { generateMockQueryResults } from '../data/mockData';

// This function simulates API calls in the deployed version
export const executeQueryApi = async (query: string): Promise<QueryResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Use the existing mock data generator
  return generateMockQueryResults(query);
};