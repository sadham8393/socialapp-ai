import axios from "axios";

export async function fetchCountries() {
  const res = await axios.get("https://restcountries.com/v3.1/all?fields=name,cca2");
  return res.data.map((c: { name: { common: string }; cca2: string }) => ({ name: c.name.common, code: c.cca2 }))
    .sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
}

export async function fetchStates(countryName: string) {
  const res = await axios.post("https://countriesnow.space/api/v0.1/countries/states", { country: countryName });
  return res.data.data.states.map((s: { name: string }) => s.name);
}
