import React from "react";
import { useContext, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiPhoneNumber from "material-ui-phone-number";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import Cookies from "js-cookie";
import { getUser } from "../User";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: 100,
    width: 100,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ContactCreateForm() {
  const classes = useStyles();

  var user = getUser();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const saveContactHandler = async (event) => {
    setSubmitted(true);
    event.preventDefault();

    var csrftoken = Cookies.get("csrftoken");
    let config = {
      headers: {
        "X-CSRFToken": csrftoken,
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    };

    const userData = {
      firstName: firstname,
      lastName: lastname,
      contactNo: phone,
      email: email,
      address: address,
    };

    try {
      const res = await axios.post("/api/contact/new/", userData, config);
      if (res) {
        let data = res.data;
        window.location.replace("/");
      }
    } catch (error) {
      setSubmitted(false);
      let error_msg = error.response.data.message;

      console.log(error_msg);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create New Contact
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => setFirstname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(event) => setLastname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPhoneNumber
                variant="outlined"
                autoComplete="phone"
                fullWidth
                defaultCountry={"us"}
                onChange={(value) => setPhone(value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                onChange={(event) => setAddress(event.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.paper}>
            {!submitted ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={saveContactHandler}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </form>
      </div>
    </Container>
  );
}
