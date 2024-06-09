import { Typography } from "@mui/material";
import AddCompanyComponent from "./AddCompanyComponent";

export const ControlPanelComponents = {
  InitialView: "InitialView",
  AddCompany: "AddCompany",
  GetCompanies: "GetCompanies",
} as const;

const { AddCompany, GetCompanies, InitialView } = ControlPanelComponents;
// eslint-disable-next-line react-refresh/only-export-components
export const ComponentMap: Record<string, JSX.Element | null> = {
  [AddCompany]: <AddCompanyComponent />,
  [InitialView]: <Typography>Very good initial view</Typography>,
  [GetCompanies]: null,
};
