import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableToolbar from "./TableToolbar";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const TableLocations = () => {
  const [rowData, setRowData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    fetch("https://test-api.seucom.com/api/locations", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.code === 200) {
          setRowData(resData.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <TableToolbar label="All Locations" actionButton />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Created Date</TableCell>
              <TableCell align="right">Updated Date</TableCell>
              <TableCell>Updated By</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row, index) => {
              const lowerRow = page * rowsPerPage; // misal 2 * 10 = 20
              const upperRow = (page + 1) * rowsPerPage; // misal 3 * 10 = 30
              const realRowNumber = index + 1; // berarti hanya render row 21 sampe 30
              if (realRowNumber <= lowerRow || realRowNumber > upperRow) {
                return null;
              }
              return (
                <TableRow key={row.locID}>
                  <TableCell>{row.locName}</TableCell>
                  <TableCell>{row.locTypeLabel}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.locActiveLabel}
                      size="small"
                      color={row.locActive ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {formatDate(row.locCreatedAt)}
                  </TableCell>
                  <TableCell align="right">
                    {formatDate(row.locUpdatedAt)}
                  </TableCell>
                  <TableCell>{row.locUpdatedUsr}</TableCell>
                  <TableCell align="center">
                    <Link to={"edit/" + row.locID}>
                      <IconButton aria-label="edit" size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Link>
                    <Link to={"detail/" + row.locID}>
                      <IconButton aria-label="detail" size="small">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={rowData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default TableLocations;
