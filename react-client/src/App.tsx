import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoutePath from "@/routing/routes";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import styled from "@emotion/styled";
import { createModeTheme } from "@/theme/theme";
import CommonSnackBar from "@/components/CommonSnackBar";
import AppNavigationBar from "@/components/navigationBar/AppNavigationBar";
import MapPage from "@/views/MapPage";
import LandingPage from "@/views/LandingPage";

import "typeface-roboto";
import { useThemeManagement } from "@/hooks/useThemeManagement";
import useCheckAuthToken from "@/hooks/useCheckAuthToken";

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
  height: "50px",
  backgroundColor: "gray",
});

const App = () => {
  useCheckAuthToken();
  const currentTheme = useThemeManagement();

  return (
    <ThemeProvider theme={createModeTheme(currentTheme)}>
      {/* Resets browsers default css e.g. styling for <a> elements */}
      <CssBaseline />
      <Router>
        <MainContainer component="nav">
          <AppNavigationBar />
          <PageContainer component="main">
            <Routes>
              <Route path={RoutePath.LandingPage} element={<LandingPage />} />
              <Route path={RoutePath.MapPage} element={<MapPage />} />
            </Routes>
          </PageContainer>
          <Footer />
        </MainContainer>
      </Router>
      <CommonSnackBar />
    </ThemeProvider>
  );
};

export default App;
