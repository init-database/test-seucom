import * as React from "react";
import TableLocations from "../../components/Locations/Table";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Locations = () => {
  const [showSnakbar, setShowSnackbar] = React.useState(false);
  const [snakbarText, setSnackbarText] = React.useState("");
  const location = useLocation(null);

  React.useEffect(() => {
    if (location && location.state && location.state.fromForm) {
      const crudMsg = sessionStorage.getItem("crudLocMsg");
      sessionStorage.removeItem("crudLocMsg");
      setSnackbarText(location.state.fromForm ? crudMsg : "");
      if (location.state.fromForm && crudMsg) {
        setShowSnackbar(true);
      }
    }
  }, [location]);

  const handleClose = () => {
    setShowSnackbar(false);
  };

  return (
    <React.Fragment>
      <TableLocations />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={showSnakbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snakbarText}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Locations;
