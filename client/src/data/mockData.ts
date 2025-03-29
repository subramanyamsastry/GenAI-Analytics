import { QueryResult } from "../types";

// These are the chart data generators to simulate AI-generated results
const generateSalesData = () => {
  return [
    { name: "Jan", value: Math.floor(Math.random() * 1000000) + 500000 },
    { name: "Feb", value: Math.floor(Math.random() * 1000000) + 500000 },
    { name: "Mar", value: Math.floor(Math.random() * 1000000) + 500000 },
    { name: "Apr", value: Math.floor(Math.random() * 1000000) + 500000 },
    { name: "May", value: Math.floor(Math.random() * 1000000) + 500000 },
    { name: "Jun", value: Math.floor(Math.random() * 1000000) + 500000 },
  ];
};

const generateQuarterlyData = () => {
  return [
    { name: "Q1", value: Math.floor(Math.random() * 2000000) + 1000000 },
    { name: "Q2", value: Math.floor(Math.random() * 2000000) + 1000000 },
    { name: "Q3", value: Math.floor(Math.random() * 2000000) + 1000000 },
    { name: "Q4", value: Math.floor(Math.random() * 2000000) + 1000000 },
  ];
};

const generateRegionalData = () => {
  return [
    { name: "North America", value: Math.floor(Math.random() * 3000000) + 1000000 },
    { name: "Europe", value: Math.floor(Math.random() * 2500000) + 800000 },
    { name: "Asia Pacific", value: Math.floor(Math.random() * 2000000) + 1200000 },
    { name: "Latin America", value: Math.floor(Math.random() * 1500000) + 400000 },
    { name: "Middle East", value: Math.floor(Math.random() * 1000000) + 300000 },
  ];
};

const generateChannelData = () => {
  return [
    { name: "Organic", value: Math.floor(Math.random() * 100000) + 20000 },
    { name: "Social", value: Math.floor(Math.random() * 80000) + 30000 },
    { name: "Email", value: Math.floor(Math.random() * 60000) + 25000 },
    { name: "Referral", value: Math.floor(Math.random() * 70000) + 20000 },
    { name: "Direct", value: Math.floor(Math.random() * 90000) + 40000 },
  ];
};

// Function to generate insights based on data
const generateInsights = (data: { name: string; value: number }[]) => {
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const avgValue = totalValue / data.length;
  const maxItem = data.reduce((max, item) => item.value > max.value ? item : max, data[0]);
  const minItem = data.reduce((min, item) => item.value < min.value ? item : min, data[0]);
  const growthRate = ((maxItem.value - minItem.value) / minItem.value * 100).toFixed(1);
  
  return [
    `Total ${maxItem.name === "Q4" ? "revenue" : "value"} is $${totalValue.toLocaleString()}`,
    `${maxItem.name} had the highest performance with $${maxItem.value.toLocaleString()}`,
    `Average ${minItem.name === "Direct" ? "acquisition cost" : "value"} is $${avgValue.toLocaleString()}`,
    `Growth rate of ${growthRate}% observed from ${minItem.name} to ${maxItem.name}`
  ];
};

// Main function to generate mock results based on query
export const generateMockQueryResults = (query: string): QueryResult => {
  const queryLower = query.toLowerCase();
  let data;
  let title;
  let subtitle;
  let chartType: "bar" | "line" = "bar";
  
  // Determine the type of data to show based on the query
  if (queryLower.includes("sales") || queryLower.includes("trend")) {
    data = generateSalesData();
    title = "Sales Trends Analysis";
    subtitle = "Monthly sales performance over time";
    chartType = "line";
  } else if (queryLower.includes("quarter")) {
    data = generateQuarterlyData();
    title = "Quarterly Performance";
    subtitle = "Revenue breakdown by quarter";
  } else if (queryLower.includes("region")) {
    data = generateRegionalData();
    title = "Regional Revenue Distribution";
    subtitle = "Revenue comparison across different regions";
  } else if (queryLower.includes("channel") || queryLower.includes("acquisition")) {
    data = generateChannelData();
    title = "Channel Performance";
    subtitle = "Customer acquisition metrics by channel";
  } else {
    // Default data
    data = generateSalesData();
    title = "Data Analysis Results";
    subtitle = "Generated insights based on your query";
    chartType = "line";
  }
  
  const insights = generateInsights(data);
  
  return {
    title,
    subtitle,
    data,
    chartType,
    insights,
    query
  };
};
