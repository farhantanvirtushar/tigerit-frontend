import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { getUser } from "../User";
const useStyles = makeStyles((theme) => ({
  topbar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
  },
  topbarGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
  },
  search: {
    width: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#dbdbdb",
    borderRadius: 10,
    padding: 5,
  },
}));

export default function Topbar(props) {
  var { search, setSearch, keyPress } = props;
  const classes = useStyles();

  var user = getUser();

  const handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();

    window.location.reload();
  };
  const goHome = () => {
    window.location.replace("/");
  };
  const handleCreateContact = () => {
    window.location.replace("/new");
  };
  return (
    <div className={classes.topbar}>
      <div className={classes.topbarGroup}>
        {/* <Avatar sx={{ bgcolor: "#0000ff" }}>
          <PersonIcon />
        </Avatar> */}
        <IconButton
          aria-label="contact"
          color="primary"
          size="large"
          onClick={goHome}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Button
          variant="text"
          onClick={goHome}
          style={{ textTransform: "capitalize", color: "#000000" }}
        >
          <Typography variant="h5">Contacts</Typography>
        </Button>
      </div>

      <div className={classes.search}>
        <SearchIcon />
        <TextField
          className={classes.searchInput}
          id="outlined-basic"
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder="search by name"
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={keyPress}
        ></TextField>
      </div>
      <div className={classes.topbarGroup}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateContact}
          startIcon={<AddIcon />}
        >
          Create contact
        </Button>
        <Typography variant="h5" style={{ margin: 10 }}>
          {user.firstName + " " + user.lastName}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogOut}>
          Logout
        </Button>
      </div>
    </div>
  );
}
