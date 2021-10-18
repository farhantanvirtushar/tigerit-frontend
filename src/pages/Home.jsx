import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Container, Grid } from "@material-ui/core";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import Topbar from "../components/Topbar";

import Contacts from "../components/Contacts";
import { getUser, updateUser } from "../User";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  row: {
    marginBottom: theme.spacing(5),
  },
  topbar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Home() {
  const classes = useStyles();

  const history = useHistory();
  let user = getUser();
  const limit = 8;

  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  if (user == null) {
    window.location.replace("/login");
  }

  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  };

  const getAllContacts = async (pageNo, searchKey) => {
    try {
      searchKey = searchKey.replace(" ", "");
      var offset = (pageNo - 1) * limit;
      const res = await axios.get(
        "/api/contact/all?search=" +
          searchKey +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        config
      );

      if (res) {
        setContacts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const keyPress = async (event) => {
    if (event.keyCode == 13) {
      getAllContacts(1, event.target.value);

      setPage(1);
    }
  };
  const handleLogOut = () => {
    sessionStorage.clear();
    localStorage.clear();

    window.location.reload();
  };

  const handlePageChange = async (event, page) => {
    setPage(page);
    getAllContacts(page, search);
  };

  useEffect(() => {
    getAllContacts(page, search);
  }, []);

  return (
    <div>
      <Container>
        <div className={classes.paper}>
          <Topbar {...{ search, setSearch, keyPress }} />
          <Contacts contacts={contacts}></Contacts>
          <Stack spacing={2} className={classes.row}>
            <Pagination
              count={10}
              color="primary"
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      </Container>
    </div>
  );
}
