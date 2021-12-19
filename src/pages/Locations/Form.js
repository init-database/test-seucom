import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./Form.module.css";
import MenuItem from "@mui/material/MenuItem";
import Title from "../../components/Title";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LoadingButton from '@mui/lab/LoadingButton';

const baseUrl = "https://test-api.seucom.com/api/locations";

const parallelRequest = async () => {
  const [resType, resProject] = await Promise.all([
    fetch(baseUrl + "/type"),
    fetch(baseUrl + "/project"),
  ]);
  if (!resType.ok || !resProject.ok) {
    const message = `An error has occured: ${resType.status} & ${resProject.status}`;
    throw new Error(message);
  }
  const type = await resType.json();
  const project = await resProject.json();
  return [type, project];
};

const FormLocation = (props) => {
  const [locationType, setLocationType] = useState({});
  const [selectedLocationType, setSelectedLocationType] = useState("");
  const [locationTypeError, setLocationTypeError] = useState(false);
  const [locationTypeErrorText, setLocationTypeErrorText] = useState(
    "Location Type cannot be blank."
  );

  const [project, setProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [projectError, setProjectError] = useState(false);
  const [projectErrorText, setProjectErrorText] = useState(
    "Project cannot be blank."
  );

  const [building, setBuilding] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [buildingError, setBuildingError] = useState(false);
  const [buildingErrorText, setBuildingErrorText] = useState(
    "Building cannot be blank."
  );

  const [floor, setFloor] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [floorError, setFloorError] = useState(false);

  const [locationName, setLocationName] = useState("");
  const [locationNameError, setLocationNameError] = useState(false);
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const [dispensation, setDispensation] = useState("0");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(null);
  const { locID } = useParams({ locID: "" });

  useEffect(() => {
    parallelRequest()
      .then(([resDataType, resDataProject]) => {
        setLocationType(resDataType.data);
        setProject(resDataProject.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetch(baseUrl + "/building/" + selectedProject)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.code === 200) {
            setBuilding(resData.data);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedBuilding) {
      fetch(baseUrl + "/floor/" + selectedBuilding)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.code === 200) {
            setFloor(resData.data);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [selectedBuilding]);

  useEffect(() => {
    // KETIKA MASUK HALAMAN EDIT
    if (location.pathname.startsWith("/locations/edit")) {
      fetch(baseUrl + "/" + locID)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.code === 200) {
            setLocationName(resData.data.locName);
            setSelectedLocationType(resData.data.locType);
            setLatitude(0);
            setLongitude(0);
            setDispensation(0);
            setSelectedProject(
              resData.data.project ? resData.data.project.locCode : ""
            );
            setSelectedBuilding(
              resData.data.building ? resData.data.building.locCode : ""
            );
            setSelectedFloor(
              resData.data.floor ? resData.data.floor.locCode : ""
            );
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  const handleSave = () => {
    setLoading(true);
    let isValid = true;
    if (!selectedLocationType) {
      setLocationTypeError(true);
      isValid = false;
    }
    if (
      (selectedLocationType === "BD" ||
        selectedLocationType === "FL" ||
        selectedLocationType === "RO") &&
      !selectedProject
    ) {
      setProjectError(true);
      isValid = false;
    }
    if (
      (selectedLocationType === "FL" || selectedLocationType === "RO") &&
      !selectedBuilding
    ) {
      setBuildingError(true);
      isValid = false;
    }
    if (selectedLocationType === "RO" && !selectedFloor) {
      setFloorError(true);
      isValid = false;
    }
    if (!locationName) {
      setLocationNameError(true);
      isValid = false;
    }

    // REQUEST API
    if (isValid) {
      fetch(
        "https://test-api.seucom.com/api/locations" +
          (locID ? "/" + locID : ""),
        {
          method: location.pathname === "/locations/add" ? "POST" : "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locName: locationName,
            locType: selectedLocationType,
            locLatitude: latitude,
            locLongitude: longitude,
            locDispensation: dispensation,
            projectCode: selectedProject,
            buildingCode: selectedBuilding,
            floorCode: selectedFloor,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          if (resData.code === 200) {
            sessionStorage.setItem(
              "crudLocMsg",
              location.pathname === "/locations/add"
                ? "Location added successfully"
                : "Location updated successfully"
            );
            navigate("/locations", {
              replace: false,
              state: { fromForm: true },
            });
          } else {
            // masuk sini ada error validasi
            if (resData.data.length) {
              resData.data.forEach((obj) => {
                if (obj.param === "projectCode") {
                  setProjectErrorText(obj.msg);
                  setProjectError(true);
                } else if (obj.param === "buildingCode") {
                  setBuildingErrorText(obj.msg);
                  setBuildingError(true);
                } else if (obj.param === "locType") {
                  setLocationTypeErrorText(obj.msg);
                  setLocationTypeError(true);
                }
              });
            }
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
        });
    }
  };

  const handleLocationTypeChange = (event) => {
    setSelectedLocationType(event.target.value);
    setProjectError(false);
    setBuildingError(false);
    setFloorError(false);
    if (event.target.value !== "") {
      setLocationTypeError(false);
    }
    if (event.target.value === "" || event.target.value === "PR") {
      setSelectedProject("");
      setSelectedBuilding("");
      setSelectedFloor("");
    }
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
    if (event.target.value) {
      setProjectError(false);
    }
  };

  const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
    if (event.target.value) {
      setBuildingError(false);
    }
  };

  const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value);
    if (event.target.value) {
      setFloorError(false);
    }
  };

  const handleLocationNameChange = (event) => {
    setLocationName(event.target.value);
    if (event.target.value) setLocationNameError(false);
  };

  return (
    <Paper sx={{ p: 4, display: "flex", flexDirection: "column" }}>
      <Title sx={{ m: 1 }}>Add Location Form</Title>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mt: 1, mb: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          margin="dense"
          id="location-type"
          label="Location Type"
          fullWidth
          variant="outlined"
          value={selectedLocationType}
          onChange={handleLocationTypeChange}
          select
          required
          error={locationTypeError}
          helperText={locationTypeError && locationTypeErrorText}
        >
          {Object.keys(locationType).map((value) => (
            <MenuItem key={value} value={value}>
              {locationType[value]}
            </MenuItem>
          ))}
        </TextField>

        {selectedLocationType === "BD" && (
          <Fragment>
            {/* PROJECT */}
            <TextField
              margin="dense"
              id="project"
              label="Project"
              fullWidth
              variant="outlined"
              value={selectedProject}
              onChange={handleProjectChange}
              select
              required
              error={projectError}
              helperText={projectError && projectErrorText}
            >
              {project.map((obj) => (
                <MenuItem key={obj.locID} value={obj.locCode}>
                  {obj.locName}
                </MenuItem>
              ))}
            </TextField>
          </Fragment>
        )}

        {selectedLocationType === "FL" && (
          <Fragment>
            {/* PROJECT */}
            <TextField
              margin="dense"
              id="project"
              label="Project"
              fullWidth
              variant="outlined"
              value={selectedProject}
              onChange={handleProjectChange}
              select
              required
              error={projectError}
              helperText={projectError && projectErrorText}
            >
              {project.map((obj) => (
                <MenuItem key={obj.locID} value={obj.locCode}>
                  {obj.locName}
                </MenuItem>
              ))}
            </TextField>
            {/* BUILDING */}
            <TextField
              margin="dense"
              id="building"
              label="Building"
              fullWidth
              variant="outlined"
              value={selectedBuilding}
              onChange={handleBuildingChange}
              select
              required
              error={buildingError}
              helperText={buildingError && buildingErrorText}
            >
              {building.map((obj) => (
                <MenuItem key={obj.locID} value={obj.locCode}>
                  {obj.locName}
                </MenuItem>
              ))}
            </TextField>
          </Fragment>
        )}

        {selectedLocationType === "RO" && (
          <Fragment>
            {/* PROJECT */}
            <TextField
              margin="dense"
              id="project"
              label="Project"
              fullWidth
              variant="outlined"
              value={selectedProject}
              onChange={handleProjectChange}
              select
              required
              error={projectError}
              helperText={projectError && projectErrorText}
            >
              {project.map((obj) => (
                <MenuItem key={obj.locID} value={obj.locCode}>
                  {obj.locName}
                </MenuItem>
              ))}
            </TextField>
            {/* BUILDING */}
            <TextField
              margin="dense"
              id="building"
              label="Building"
              fullWidth
              variant="outlined"
              value={selectedBuilding}
              onChange={handleBuildingChange}
              select
              required
              error={buildingError}
              helperText={buildingError && buildingErrorText}
            >
              {building.map((obj) => (
                <MenuItem key={obj.locID} value={obj.locCode}>
                  {obj.locName}
                </MenuItem>
              ))}
            </TextField>
            {/* FLOOR */}
            <TextField
              margin="dense"
              id="floor"
              label="Floor"
              fullWidth
              variant="outlined"
              value={selectedFloor}
              onChange={handleFloorChange}
              select
              required
              error={floorError}
              helperText={floorError && "Floor cannot be blank."}
            >
              {floor.map((obj) => (
                <MenuItem key={obj.locID} value={obj.locCode}>
                  {obj.locName}
                </MenuItem>
              ))}
            </TextField>
          </Fragment>
        )}

        {/* LOCATION NAME */}
        <TextField
          margin="dense"
          id="name"
          label="Location Name"
          fullWidth
          variant="outlined"
          value={locationName}
          onChange={handleLocationNameChange}
          required
          error={locationNameError}
          helperText={locationNameError && "Location Name cannot be blank."}
        />
        <div className={classes["location-wrapper"]}>
          <TextField
            margin="dense"
            id="latitude"
            label="Latitude *"
            fullWidth
            variant="outlined"
            value={latitude}
          />
          <div className={classes["hor-gap"]}></div>
          <TextField
            margin="dense"
            id="longitude"
            label="Longitude *"
            fullWidth
            variant="outlined"
            value={longitude}
          />
          <div className={classes["hor-gap"]}></div>
          <TextField
            margin="dense"
            id="dispensation"
            label="Dispensation (in meters) *"
            fullWidth
            variant="outlined"
            value={dispensation}
          />
        </div>
        <div className={classes["ver-gap"]}></div>
        <div className={classes["action-button-wrapper"]}>
          <Link to={"/locations"} className="link-no-style">
            <Button variant="outlined">Cancel</Button>
          </Link>
          <div className={classes['hor-gap']}></div>
          <LoadingButton onClick={handleSave} loading={loading} variant="contained">
            Save
          </LoadingButton>
        </div>
      </Box>
    </Paper>
  );
};

export default FormLocation;
