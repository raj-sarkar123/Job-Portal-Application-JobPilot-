import { useSession } from "@clerk/clerk-react";
import { useState, useCallback } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { session, isLoaded } = useSession();

  const fn = useCallback(
    async (...args) => {
      if (!isLoaded || !session) return;

      setLoading(true);
      setError(null);

      try {
        const token = await session.getToken({ template: "supabase" });

        const response = await cb(token, options, ...args);
        setData(response);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [isLoaded, session, cb, options]
  );

  return { fn, data, loading, error };
};

export default useFetch;
