import { useState, Router } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { useFormik } from "formik";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

export default function SignUp() {
  const classes = useStyles();

  const validate = (values) => {
    const errors = {};
    if (!values.Name) {
      errors.Name = "Required";
    } else if (values.Name.length < 8) {
      errors.Name = "Must be at least 8 characters";
    }

    if (!values.Username) {
      errors.Username = "Required";
    } else if (values.Username.length < 4) {
      errors.Username = "Must be at least 4 characters";
    }

    if (!values.Email) {
      errors.Email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
    ) {
      errors.Email = "Invalid email address";
    }

    if (!values.BirthDate) {
      errors.BirthDate = "Required";
    } /* else if (getAge(values.BirthDate) < 18){
      errors.BirthDate = "Must be over 18 years old"
    }
 */
    if (!values.Password) {
      errors.Password = "Required";
    } /* else if (values.Password.length < 8) {
      errors.Password = "Must be at least 8 characters";
    } */
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      Name: "",
      Username: "",
      Email: "",
      Genre: null,
      BirthDate: "",
      Password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);

      axios
      .post("http://localhost:3001/auth/signup", values)
      .then(function (response) {
        console.log(response);
        
        Router.push("/signin");
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="name"
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
                fullWidth
                id="username"
                label="Username"
                name="Username"
                autoComplete="username"
                value={formik.values.Username}
                onChange={formik.handleChange}
              />
              {formik.errors.Username ? <div>{formik.errors.Username}</div> : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="Email"
                autoComplete="email"
                value={formik.values.Email}
                onChange={formik.handleChange}
              />
              {formik.errors.Email ? <div>{formik.errors.Email}</div> : null}
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="genre">Genre</InputLabel>
                <Select
                  labelId="genre"
                  id="genre"
                  name="Genre"
                  label="Genre"
                  value={formik.values.Genre}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={null}>None</MenuItem>
                  <MenuItem value={1}>Female</MenuItem>
                  <MenuItem value={2}>Male</MenuItem>
                  <MenuItem value={3}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="birthDate"
                name="BirthDate"
                label="Birthday"
                type="date"
                required
                fullWidth
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.Birthday}
                onChange={formik.handleChange}
              />
              {formik.errors.BirthDate ? <div>{formik.errors.BirthDate}</div> : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.value}
                onChange={formik.handleChange}
              />
              {formik.errors.Password ? <div>{formik.errors.Password}</div> : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
