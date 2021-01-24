import {
  CssBaseline,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
import dateFormat from "dateformat";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CreateIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import { useFormik } from "formik";
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
  icons: {
    textAlign: "right",
  },
}));

const Comment = ({ commentData }) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(0);

  const token = Cookies.get("token");

  let data = jwt.decode(token);

  const formik = useFormik({
    initialValues: {
      Text: commentData.Text,
      Date: "",
      UserId: commentData.UserId,
      PostId: commentData.PostId,
      CommentId: null,
    },
    onSubmit: (values) => {
      values.Date = new Date();

      const token = Cookies.get("token");
      if (!token) return;

      axios
        .put("http://localhost:3001/comments/" + commentData.Id, values, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          window.location.reload(false);
        })
        .catch(function (error) {
          alert(error);
        });
    },
  });

  const handleClickDelete = () => {
    const token = Cookies.get("token");
    if (!token) return;

    axios
      .delete("http://localhost:3001/comments/" + commentData.Id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        window.location.reload(false);
      })
      .catch(function (error) {
        alert(error);
      });
  };


  const handleClickEditComment = () => {
    setIsEditing(1);
  };

  const handleClickCancelComment = () => {
    setIsEditing(0);
  };

  return (
    <Container>
      <CssBaseline />
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography
                className={"MuiTypography--subheading"}
                variant={"caption"}
              >
                By {commentData.Username}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                className={"MuiTypography--subheading"}
                variant={"caption"}
              >
                {!isNaN(Date.parse(commentData.Date))
                  ? dateFormat(commentData.Date, "dd/mm/yyyy HH:MM")
                  : ""}
              </Typography>
            </Grid>

            {data && commentData.UserId == data.Id && (
              <Grid item xs={3} className={classes.icons}>
                {!isEditing == 1 && (
                  <Button
                    className={classes.icons}
                    onClick={handleClickEditComment}
                  >
                    <CreateIcon />
                  </Button>
                )}
                {!isEditing == 1 && (
                  <Button className={classes.icons} onClick={handleClickDelete}>
                    <DeleteOutlineIcon />
                  </Button>
                )}
                {isEditing == 1 && (
                  <Button
                    className={classes.icons}
                    onClick={formik.handleSubmit}
                  >
                    <SaveIcon />
                  </Button>
                )}
                {isEditing == 1 && (
                  <Button
                    className={classes.icons}
                    onClick={handleClickCancelComment}
                  >
                    <CloseIcon />
                  </Button>
                )}
              </Grid>
            )}
          </Grid>
        </CardContent>
        <CardContent className={classes.content}>
          {!isEditing ? (
            <span>{commentData.Text}</span>
          ) : (
            <TextField
              name="Text"
              multiline
              fullWidth
              value={formik.values.Text}
              onChange={formik.handleChange}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Comment;
