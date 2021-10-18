import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    minHeight: 500,
  },
}));

export default function Contacts(props) {
  var contacts = props.contacts;
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell aligh="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Contact No</TableCell>
              <TableCell align="left">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">
                  {row.firstName + " " + row.lastName}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.contactNo}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
