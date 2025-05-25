import { useEffect, useState } from "react";
import { fetchCountries } from "../redux/api/countries";

export function useCountries() {
  const [countries, setCountries] = useState<{ name: string; code: string }[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCountries();
        if (Array.isArray(data)) setCountries(data);
      } catch {
        setCountries([]);
      }
    })();
  }, []);

  return countries;
}
