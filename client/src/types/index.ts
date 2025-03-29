export interface QueryHistoryItem {
  text: string;
  timestamp: string;
}

export interface QueryResult {
  title: string;
  subtitle: string;
  data: { name: string; value: number }[];
  chartType: "bar" | "line";
  insights: string[];
  query: string;
}
