import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useState, Router } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(1, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    marginTop: "5%",
  },
  divider: {
    margin: 10, //`${makeStyles.spacing.unit * 3}px 0`,
  },
}));

const CreateComment = ({ postData }) => {
  const classes = useStyles();
  const router = useRouter();

  const validate = (values) => {
    const errors = {};
    if (!values.Text) {
      errors.Text = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      Text: "",
      Date: "",
      CommentId: null,
      UserId: null,
      PostId: null,
    },
    validate,
    onSubmit: (values) => {
      const token = Cookies.get("token");

      let data = jwt.decode(token);

      values.Date = new Date();
      values.UserId = data.Id;
      values.PostId = postData.Id;

      axios
        .post("http://localhost:3001/comments/", values, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          window.location.reload();
        })
        .catch(function (error) {
          alert(error);
        });
    },
  });

  return (
    <Container>
      <Divider className={classes.divider} light />
      <CssBaseline />
      <form noValidate noValidate onSubmit={formik.handleSubmit}>
        <TextField
          id="NewComment"
          name="Text"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={formik.values.value}
          onChange={formik.handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Comment
        </Button>
      </form>
      {formik.errors.Text && <div>{formik.errors.Text}</div>}

      <Divider className={classes.divider} light />
    </Container>
  );
};

export default CreateComment;
