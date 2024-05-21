import { useState } from "react";
import {
  AppBar,
  Button,
  Link,
  Toolbar,
  Typography,
  Box,
  Switch,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { styled } from "@mui/material/styles";
import { ThemeType } from "@/theme/theme";
import { LinkProps as MuiLinkProps } from "@mui/material/Link";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import RoutePath from "@/routing/routes";
import { setTheme } from "@/store/slices/uiSlice";
import LoginModal from "@/components/navigationBar/LoginModal";
import RegisterModal from "@/components/navigationBar/RegisterModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { logoutUser } from "@/store/actions/authActions";

type StyledLinkProps = MuiLinkProps &
  Omit<RouterLinkProps, "to"> & { to: string };

const StyledLink = styled(({ ...props }: StyledLinkProps) => (
  <Link {...props} component={RouterLink} underline="hover" />
))(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: theme.palette.info.dark,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightRegular,
}));

const ThemedAppBar = styled(AppBar)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  boxShadow: `${theme.shadows[2]}, 0 4px 6px -1px rgba(0, 0, 0, 0.2)`,
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
}));

const ModalButton = styled(Button)(({ theme }) => ({
  color: theme.palette.info.contrastText,
  backgroundColor: theme.palette.info.main,
  margin: "0px 10px 0px 10px",
}));

const NavigationSection = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const AppNavigationBar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const { selectedTheme } = useAppSelector((s) => s.ui);
  const { isLoggedIn } = useAppSelector((s) => s.auth);

  const dispatch = useAppDispatch();

  const handleLoginModal = (open: boolean) => setOpenLogin(open);
  const handleRegisterModal = (open: boolean) => setOpenRegister(open);
  const handleLogout = () => dispatch(logoutUser());

  const handleThemeChange = () => {
    const newTheme: ThemeType = selectedTheme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
  };

  const renderActionButtonBasedIsUserLogged = (): JSX.Element => {
    if (isLoggedIn) {
      return <ModalButton onClick={handleLogout}>Logout</ModalButton>;
    }

    return (
      <>
        <ModalButton onClick={() => handleLoginModal(true)}>Login</ModalButton>
        <ModalButton onClick={() => handleRegisterModal(true)}>
          Register
        </ModalButton>
      </>
    );
  };

  return (
    <>
      <Box component="nav">
        <ThemedAppBar>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <NavigationSection>
              <Typography variant="h6">LinkedIn Copy</Typography>
              <StyledLink to={RoutePath.LandingPage}>Home</StyledLink>
              <StyledLink to={RoutePath.MapPage}>MapView</StyledLink>
            </NavigationSection>
            <NavigationSection>
              {renderActionButtonBasedIsUserLogged()}
              <Switch
                checked={selectedTheme === "dark"}
                onChange={handleThemeChange}
              />
              <DarkModeOutlinedIcon color="action" />
            </NavigationSection>
          </Toolbar>
        </ThemedAppBar>
      </Box>

      <LoginModal isOpen={openLogin} handleModalOpen={handleLoginModal} />
      <RegisterModal
        isOpen={openRegister}
        handleModalOpen={handleRegisterModal}
      />
    </>
  );
};

export default AppNavigationBar;
