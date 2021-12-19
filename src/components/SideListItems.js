import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useLocation } from "react-router-dom";

const SideListItems = () => {
  const location = useLocation(null);
  return (
    <div>
      <Link
        to={"/locations"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <List>
          <ListItemButton selected={location.pathname.startsWith('/locations')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Locations" />
          </ListItemButton>
        </List>
      </Link>
    </div>
  );
};

export default SideListItems;
