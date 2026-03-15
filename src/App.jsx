import { Navigate, Route, Routes } from "react-router-dom";
import { getLegacyRouteEntries } from "./legacyRoutes.js";
import LegacyRoute from "./LegacyRoute.jsx";

export default function App() {
  const legacyRoutes = getLegacyRouteEntries();

  return (
    <Routes>
      {legacyRoutes.map(([path, loader]) => (
        <Route key={path} path={path} element={<LegacyRoute loader={loader} />} />
      ))}
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
