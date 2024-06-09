import { Routes, Route } from "react-router-dom";
import RoutePath from "@/routing/routes";
import LandingPage from "@/views/LandingPage";
import MapPage from "@/views/mapView/MapPage";

const RouterComponent = () => (
  <Routes>
    <Route path={RoutePath.LandingPage} element={<LandingPage />} />
    <Route path={RoutePath.MapPage} element={<MapPage />} />
  </Routes>
);

export default RouterComponent;
