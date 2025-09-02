import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔍 Fetching from:", url); // Debug URL

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`❌ API Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log("✅ API Response:", result); // Debug response

        // If your backend sends data as { success, message, data }
        setData(result.data || result);
      } catch (err) {
        console.error("⚠️ Fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
