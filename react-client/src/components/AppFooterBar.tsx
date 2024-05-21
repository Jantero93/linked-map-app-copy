import { Typography, styled, AppBar, Box } from "@mui/material";

const ThemedFooter = styled(AppBar)(({ theme }) => ({
  display: "flex",
  flexDirection: "row-reverse",
  position: "relative",
  fontFamily: theme.typography.fontFamily,
  boxShadow: `${theme.shadows[20]}, 0 4px 6px -1px rgba(0, 0, 0, 0.2)`,
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.paper,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightRegular,
}));

const AppFooterBar = () => (
  <Box component="footer">
    <ThemedFooter>
      <StyledTypography>&copy; Jantero93</StyledTypography>
    </ThemedFooter>
  </Box>
);

export default AppFooterBar;
