import { useState } from "react";
import {
  AppBar,
  Button,
  ButtonProps,
  Container,
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
import { getSelectedTheme, setTheme } from "@/store/slices/uiSlice";
import { useSelector } from "react-redux";
import LoginModal from "@/components/navigationBar/LoginModal";
import RegisterModal from "@/components/navigationBar/RegisterModal";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { isUserLoggedIn } from "@/store/slices/authSlice";
import { logoutUser } from "@/store/actions/authActions";

// Combine LinkProps from MUI and RouterLink
type StyledLinkProps = MuiLinkProps &
  Omit<RouterLinkProps, "to"> & { to: string };

const StyledLink = styled(Link)<StyledLinkProps>(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.main,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightRegular,
}));

const ThemedAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  fontFamily: theme.typography.fontFamily,
}));

const ModalButton = styled(({ ...otherProps }: ButtonProps) => (
  <Button {...otherProps} />
))(({ theme }) => ({
  color: theme.palette.info.contrastText,
  backgroundColor: theme.palette.info.main,
  margin: "0px 10px 0px 10px",
}));

const NavigationSection = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const NavigationBar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const dispatch = useAppDispatch();
  const currentTheme = useSelector(getSelectedTheme);
  const isUserLogged = useSelector(isUserLoggedIn);

  const handleLoginModal = (open: boolean) => setOpenLogin(open);
  const handleRegisterModal = (open: boolean) => setOpenRegister(open);
  const handleLogout = () => dispatch(logoutUser());

  const handleThemeChange = () => {
    const newTheme: ThemeType = currentTheme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
  };

  const renderActionButtonBasedIsUserLogged = (): JSX.Element =>
    isUserLogged ? (
      <ModalButton onClick={handleLogout}>Logout</ModalButton>
    ) : (
      <>
        <ModalButton onClick={() => handleLoginModal(true)}>Login</ModalButton>
        <ModalButton onClick={() => handleRegisterModal(true)}>
          Register
        </ModalButton>
      </>
    );

  return (
    <Container fixed>
      <ThemedAppBar color="default">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <NavigationSection>
            <Typography variant="h6" component="h1">
              LinkedIn Copy
            </Typography>
            <StyledLink
              to={RoutePath.LandingPage}
              component={RouterLink}
              underline="hover"
            >
              Home
            </StyledLink>
            <StyledLink
              to={RoutePath.MapPage}
              component={RouterLink}
              underline="hover"
            >
              MapView
            </StyledLink>
          </NavigationSection>
          <NavigationSection>
            {renderActionButtonBasedIsUserLogged()}
            <Switch
              checked={currentTheme === "dark"}
              onChange={handleThemeChange}
            />
            <DarkModeOutlinedIcon color="action" />
          </NavigationSection>
        </Toolbar>
      </ThemedAppBar>

      {/* Modals */}
      <LoginModal isOpen={openLogin} handleModalOpen={handleLoginModal} />
      <RegisterModal
        isOpen={openRegister}
        handleModalOpen={handleRegisterModal}
      />
    </Container>
  );
};

export default NavigationBar;
