import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const TableToolbar = (props) => {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {props.label}
      </Typography>

      {props.actionButton ? (
        <Tooltip title="Add locations">
          <Link to={"/locations/add"} style={{textDecoration: 'none', color: 'inherit'}}>
            <Button variant="contained" startIcon={<AddIcon />}>
              <span>Add</span>
            </Button>
          </Link>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

export default TableToolbar;
