import React from "react";
import { useHistory } from "react-router-dom";

import { Box, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Topbar from "../components/Topbar";

import ContactCreateForm from "../components/ContactCreateForm";
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

  userInfo: {
    // Fix IE 11 issue.
    marginBottom: 10,
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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

export default function CreateContact() {
  const classes = useStyles();

  const history = useHistory();
  let user = getUser();
  const limit = 5;

  var pageNo = 1;
  const [contacts, setContacts] = useState([]);

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

  const getAllContacts = async () => {
    try {
      var offset = (pageNo - 1) * limit;
      const res = await axios.get(
        "/api/contact/all?limit=" + limit + "&offset=" + offset,
        config
      );

      if (res) {
        setContacts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    localStorage.clear();

    window.location.reload();
  };

  const handlePageChange = async (event, page) => {
    // setPage(page);
    // getAllRecords(page);
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div>
      <Container>
        <Topbar></Topbar>
        <ContactCreateForm />
      </Container>
    </div>
  );
}
