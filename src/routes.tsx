import React from "react";
import { Routes, Route } from "react-router-dom";
import FormWizard from "./pages/SocialFormWizard";

interface AppRoutesProps {
  countries: { name: string; code: string }[];
}

const AppRoutes: React.FC<AppRoutesProps> = ({ countries }) => (
  <Routes>
    <Route path="/" element={<FormWizard countries={countries} />} />
    {/* Add more routes here as needed */}
  </Routes>
);

export default AppRoutes;
