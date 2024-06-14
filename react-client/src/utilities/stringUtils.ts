import { ControlPanelComponentName } from "@/utilities/commonHelpers";

/**
 * Normalize component names of map's control panel
 */
export const normalizeControlPanelComponentName = (
  component: ControlPanelComponentName
) => {
  switch (component) {
    case "AddCompany":
      return "Add company";
    case "GetCompanies":
      return "Get all companies";
    case "InitialView":
      return "Initial view";
    default:
      throw new Error(`Unknown component component name: ${component}`);
  }
};
