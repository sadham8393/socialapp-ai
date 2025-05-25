import { useEffect, useState } from "react";
import { fetchStates } from "../redux/api/countries";

export function useStates(selectedCountry: string, countries: { name: string; code: string }[]) {
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      return;
    }
    const countryObj = countries.find(c => c.code === selectedCountry);
    if (!countryObj) {
      setStates([]);
      return;
    }
    (async () => {
      try {
        const data = await fetchStates(countryObj.name);
        if (Array.isArray(data)) setStates(data);
      } catch {
        setStates([]);
      }
    })();
  }, [selectedCountry, countries]);

  return states;
}
