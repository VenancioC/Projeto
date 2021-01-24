import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useFormik } from "formik";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PagesForm() {
  const classes = useStyles();
  const router = useRouter();

  const validate = (values) => {
    const errors = {};
    if (!values.Name) {
      errors.Name = "Required";
    }

    if (!values.Description) {
      errors.Description = "Required";
    }
  };

  const formik = useFormik({
    initialValues: {
      Name: "",
      Description: "",
      CategoryId: null,
      UserId: "",
      Followers: 0,
    },

    validate,
    onSubmit: (values) => {
      let datas = jwt.decode(Cookies.get("token"));
      values.UserId = datas.Id;
      console.log(values);
      axios
        .post("http://localhost:3001/pages", values, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then(function (response) {
          console.log(response);
          router.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });
  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a Page
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Name"
                  name="Name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                />
                {formik.errors.Name ? <div>{formik.errors.Name}</div> : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  multiline
                  rows={7}
                  id="Description"
                  label="Description"
                  name="Description"
                  autoComplete="Description"
                  value={formik.values.Description}
                  onChange={formik.handleChange}
                  fullWidth
                />
                {formik.errors.Description ? (
                  <div>{formik.errors.Description}</div>
                ) : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
