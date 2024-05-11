import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoutePath from "@/routing/routes";
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { createModeTheme } from "@/theme/theme";
import { getSelectedTheme } from "@/store/slices/uiSlice";
import NavigationBar from "@/components/navigationBar/NavigationBar";
import MapPage from "@/views/MapPage";
import LandingPage from "@/views/LandingPage";
import "typeface-roboto";

// Styled components for layout with Flexbox
const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const PageContainer = styled(Box)({
  flexGrow: 1,
});

const Footer = styled("footer")({
  height: "50px", // Fixed height for the footer
  backgroundColor: "gray",
});

const App = () => {
  //TODO: Implement save to local storage, if none there use os preferences
  // @ts-expect-error This will be used later
  const _prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const currentTheme = useSelector(getSelectedTheme);

  return (
    <ThemeProvider theme={createModeTheme(currentTheme)}>
      <CssBaseline /> {/* Normalize the default browser CSS */}
      <Router>
        <MainContainer>
          <NavigationBar />
          <PageContainer component="main">
            <Routes>
              <Route path={RoutePath.LandingPage} element={<LandingPage />} />
              <Route path={RoutePath.MapPage} element={<MapPage />} />
            </Routes>
          </PageContainer>
          <Footer />
        </MainContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
