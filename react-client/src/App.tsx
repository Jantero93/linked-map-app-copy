import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoutePath from "@/routing/routes";
import { Container } from "@mui/material";
import LandingPage from "@/views/LandingPage";
import MapPage from "@/views/MapPage";
import styled from "@emotion/styled";

const NavBar = styled("nav")({
  height: "100px",
  backgroundColor: "yellow"
});

const Footer = styled("footer")({
  height: "50px",
  backgroundColor: "gray"
});

const MainContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "red"
});

const ContentContainer = styled(Container)({
  flexGrow: 1,
  overflow: "auto",
  display: "flex"
});

const App = () => {
  return (
    <Router>
      <MainContainer disableGutters maxWidth={false}>
        <NavBar>nav bar coming</NavBar>
        <ContentContainer disableGutters maxWidth={false}>
          <Routes>
            <Route path={RoutePath.LandingPage} element={<LandingPage />} />
            <Route path={RoutePath.Map} element={<MapPage />} />
          </Routes>
        </ContentContainer>
        <Footer>footer</Footer>
      </MainContainer>
    </Router>
  );
};

export default App;
