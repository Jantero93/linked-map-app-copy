import { BrowserRouter } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import styled from "@emotion/styled";
import { createModeTheme } from "@/theme/theme";
import CommonSnackBar from "@/components/CommonSnackBar";
import AppNavigationBar from "@/components/AppNavigationBar";
import AppFooterBar from "@/components/AppFooterBar";
import { useThemeManagement } from "@/hooks/useThemeManagement";
import useCheckAuthToken from "@/hooks/useCheckAuthToken";
import RouterComponent from "@/routing/RouterComponent";

import "typeface-roboto";
import "leaflet/dist/leaflet.css";

const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const PageContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: "0",
});

const App = () => {
  useCheckAuthToken();
  const currentTheme = useThemeManagement();

  return (
    <ThemeProvider theme={createModeTheme(currentTheme)}>
      <CssBaseline />
      <BrowserRouter>
        <MainContainer component="div">
          <AppNavigationBar />
          <PageContainer component="main">
            <RouterComponent />
          </PageContainer>
          <AppFooterBar />
        </MainContainer>
      </BrowserRouter>
      <CommonSnackBar />
    </ThemeProvider>
  );
};

export default App;
