import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { QueryResult, QueryHistoryItem } from "../types";
import { generateMockQueryResults } from "../data/mockData";
import { executeQueryApi } from "../lib/deployedApiService";

interface QueryState {
  currentQuery: string;
  isLoading: boolean;
  error: string | null;
  results: QueryResult | null;
  history: QueryHistoryItem[];
}

const initialState: QueryState = {
  currentQuery: "",
  isLoading: false,
  error: null,
  results: null,
  history: [],
};

// Async thunk to simulate query processing
export const executeQuery = createAsyncThunk(
  "query/executeQuery",
  async (query: string, { rejectWithValue }) => {
    try {
      // In development, use mock data with delay
      // In production (Netlify), use the deployed API service
      let results: QueryResult;
      
      if (import.meta.env.MODE === 'production') {
        results = await executeQueryApi(query);
      } else {
        // Simulate API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // Random chance of error (10%) to demonstrate error handling
        if (Math.random() < 0.1) {
          throw new Error("We couldn't process your query. Please try again or rephrase your question.");
        }

        // Generate mock results
        results = generateMockQueryResults(query);
      }
      
      // Add to history
      const historyItem: QueryHistoryItem = {
        text: query,
        timestamp: new Date().toISOString(),
      };
      
      return { results, historyItem };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
    }
  }
);

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
    clearQuery: (state) => {
      state.currentQuery = "";
    },
    selectSuggestion: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
    clearResults: (state) => {
      state.results = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeQuery.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(executeQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.results;
        state.history = [action.payload.historyItem, ...state.history].slice(0, 10); // Keep only 10 most recent queries
      })
      .addCase(executeQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        
        // Add to history even if failed
        state.history = [
          {
            text: state.currentQuery,
            timestamp: new Date().toISOString(),
          },
          ...state.history
        ].slice(0, 10);
      });
  },
});

export const { setQuery, clearQuery, selectSuggestion, clearResults, clearError } = querySlice.actions;

export default querySlice.reducer;
