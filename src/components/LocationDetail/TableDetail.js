import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";

const TableDetail = (props) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>
              <Link to={props.locID ? '/locations/detail/' + props.locID : "#"}>
                {props.locID ? props.locID : "-"}
              </Link>
            </TableCell>
            <TableCell>Dispensation</TableCell>
            <TableCell>
              {props.locDispensation ? props.locDispensation : "-"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>{props.locCode ? props.locCode : "-"}</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>
              {props.locActive ? (
                <Chip
                  label={
                    props.locActiveLabel
                      ? props.locActiveLabel
                      : props.locActive
                      ? "Active"
                      : "Inactive"
                  }
                  size="small"
                  color={props.locActive ? "success" : "error"}
                />
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{props.locName ? props.locName : "-"}</TableCell>

            <TableCell>Created At</TableCell>
            <TableCell>
              {props.locCreatedAt ? props.locCreatedAt : "-"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>
              {props.locType
                ? props.locTypeLabel + " (" + props.locType + ")"
                : "-"}
            </TableCell>

            <TableCell>Updated At</TableCell>
            <TableCell>
              {props.locUpdatedAt ? props.locUpdatedAt : "-"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Latitude</TableCell>
            <TableCell>{props.locLatitude ? props.locLatitude : "-"}</TableCell>
            <TableCell>Updated By</TableCell>
            <TableCell>
              {props.locUpdatedUsr ? props.locUpdatedUsr : "-"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Longitude</TableCell>
            <TableCell>
              {props.locLongitude ? props.locLongitude : "-"}
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableDetail;
