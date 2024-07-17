import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { getAllCompanies } from "@/store/actions/companyActions";
import { dateToString } from "@/utilities/dateHelpers";
import { styled } from "@mui/material";
import { useEffect } from "react";
import { Marker, Popup } from "react-leaflet";

const CompanyNameText = styled("h1")(({ theme }) => ({
  ...theme.typography.h6,
}));

const EstablishmentDateText = styled("p")(({ theme }) => ({
  ...theme.typography.subtitle1,
}));

const AllCompaniesMap = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((s) => s.company.companies);

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

  return (
    <>
      {companies.map(
        ({
          id,
          name,
          establishmentDate,
          location: { latitude, longitude },
        }) => (
          <Marker key={id} position={[latitude, longitude]}>
            <Popup>
              <CompanyNameText>{name}</CompanyNameText>
              <EstablishmentDateText>
                {dateToString(establishmentDate, "MM/YYYY")}
              </EstablishmentDateText>
            </Popup>
          </Marker>
        )
      )}
    </>
  );
};

export default AllCompaniesMap;
