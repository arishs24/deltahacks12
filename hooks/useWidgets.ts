import { useState, useEffect } from 'react';

interface WidgetData {
  revenue: number;
  expenses: number;
}

export default function useWidgets() {
  const [data, setData] = useState<WidgetData>({
    revenue: 24500,
    expenses: 18000
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // In a real application, this would fetch data from an API
  useEffect(() => {
    // Mock data for now
    // In a real app, you would fetch from API
    setData({
      revenue: 24500,
      expenses: 18000
    });
  }, []);

  return {
    data,
    loading,
    error
  };
} 