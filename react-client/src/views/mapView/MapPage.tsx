import React, { useEffect, useRef, useState } from "react";
import Split from "split.js";
import { Typography, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import ControlPanel from "@/views/mapView/ControlPanelItems/ControlPanel";
import { invalidateMapSize } from "@/store/slices/uiMapSlice";
import DefaultLeafletMap from "./mapComponents/DefaultLeafletMap";
import AddCompanyComponent from "./ControlPanelItems/components/AddCompanyComponent";
import InitialViewComponent from "./ControlPanelItems/components/InitialViewComponent";
import AddCompanyMap from "./mapComponents/AddCompanyMap";
import { ControlPanelComponents } from "./componentMapping";
import { selectedControllerComponent } from "@/store/slices/generalUiSlice";
import AllCompaniesMap from "./mapComponents/AllCompaniesMap";

import "@/views/mapView/gutter.css";

const PageSection = styled("section")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
});

const ViewContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  flexGrow: 1,
  height: "calc(100vh - 130px)", // Adjust this based on your footer height
});

const { AddCompany, GetCompanies, InitialView } = ControlPanelComponents;

const ComponentMap: Record<string, [JSX.Element, JSX.Element]> = {
  [AddCompany]: [
    <AddCompanyComponent
      key={ControlPanelComponents[ControlPanelComponents.AddCompany]}
    />,
    <AddCompanyMap
      key={ControlPanelComponents[ControlPanelComponents.AddCompany]}
    />,
  ],
  [InitialView]: [
    <InitialViewComponent
      key={ControlPanelComponents[ControlPanelComponents.InitialView]}
    />,
    <AllCompaniesMap
      key={ControlPanelComponents[ControlPanelComponents.InitialView]}
    />,
  ],
  [GetCompanies]: [
    <Typography key={"test"}>Get companies</Typography>,
    <React.Fragment key={"test"} />,
  ],
};

const MapPage = () => {
  const dispatch = useAppDispatch();
  const controlPanelComponent = useAppSelector(selectedControllerComponent);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Hacky solution for rendering map tiles on resizing + route changes
  // Trello: https://trello.com/c/rGEUcJz7/86-tile-rendering-bugiin-ei-hacky-solutioni
  const [isRightRefReady, setIsRightRefReady] = useState(false);

  useEffect(() => {
    // Check if rightRef.current is ready on mount
    if (rightRef.current) {
      setIsRightRefReady(true);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(invalidateMapSize());

    if (leftRef.current && rightRef.current) {
      Split([leftRef.current, rightRef.current], {
        sizes: [50, 50],
        minSize: [200, 400],
        gutterSize: 5,
        cursor: "col-resize",
        onDrag: () => dispatch(invalidateMapSize()),
        onDragEnd: () => dispatch(invalidateMapSize()),
        onDragStart: () => dispatch(invalidateMapSize()),
      });
    }
  }, [dispatch, isRightRefReady]);

  return (
    <ViewContainer>
      <PageSection id="split-col-left" ref={leftRef}>
        <ControlPanel component={ComponentMap[controlPanelComponent][0]} />
      </PageSection>
      <PageSection id="split-col-right" ref={rightRef}>
        <DefaultLeafletMap>
          {ComponentMap[controlPanelComponent][1]}
        </DefaultLeafletMap>
      </PageSection>
    </ViewContainer>
  );
};

export default MapPage;
