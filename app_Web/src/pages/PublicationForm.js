import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CreateIcon from '@material-ui/icons/Create';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useFormik } from "formik";
import Navbar from '../components/Navbar';
import Cookies from "js-cookie";
import Autocomplete from '@material-ui/lab/Autocomplete';



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




export default function PublicationForm( {pagesData} ) {

  var today = new Date();
  const classes = useStyles();

  const validate = (values) => {
    const errors = {};
    if (!values.Name) {
      errors.Title = "Required";
    }

    if (!values.Description) {
      errors.Description = "Required";
    }
  };

  const formik = useFormik({
    initialValues: {
      Title: "",
      Description: "",
      Date: today,
      UserId : 108,// falta por o user ID
      PageId : 1,  // falta por o Page ID
    },
    validate,
    onSubmit: (values) => {
      console.log(values);

      axios
      .post("http://localhost:3001/posts", values, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
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
        Create a post
        </Typography>
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <Autocomplete

                  options={pagesData}
                  classes={{
                    option: classes.option,
                  }}
                  getOptionLabel={(option) => option.Name}
                  renderOption={(option) => (
                    <React.Fragment>
                      {option.Name} ({option.Id })   
                    </React.Fragment>
                  )
                  }     
                renderInput={(params) => 
                 
                  <TextField {...params} 
                  margin="normal" 
                  id="page"
                  name="page"
                  label="Page"                
                  value={formik.values.PageId}
                  onChange={formik.handleChange}
                  />

                }
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="Title"
                name="Title"
                variant="outlined"
                required
                fullWidth
                id="Title"
                label="Title"
                autoFocus
                value={formik.values.Title}
                onChange={formik.handleChange}
              />
              {formik.errors.Title ? <div>{formik.errors.Title}</div> : null}
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
              {formik.errors.Description ? <div>{formik.errors.Description}</div> : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Post
          </Button>
        </form>
      </div>
    </Container>
    </div>
  );

}
PublicationForm.getInitialProps = async () => {
  const res = await fetch("http://localhost:3001/pages");
  const json = await res.json();
  return { pagesData: json };
};