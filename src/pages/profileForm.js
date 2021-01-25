import { Typography, CssBaseline, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    //alignItems: "center",
  },
  card: {
    maxWidth: "100%",
    //margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
    paddingTop: 15, ///makeStyles.spacing.unit * 3,
  },
  divider: {
    margin: 10, //`${makeStyles.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  likesComment: {
    height: "100%",
    width: "100%",
    margin: "auto",
  },
}));

export default function profileForm({ Userdata }) {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get("token")) {
      Cookies.set("token", "");
      router.push("/signin");
    }
  }, [Cookies.get("token")]);

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
    }
    if (!values.Password) {
      errors.Password = "Required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      Name: "",
      Username: "",
      Email: "",
      BirthDate: "",
      Password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      let datas = jwt.decode(Cookies.get("token"));

      axios
        .put(process.env.API_URL + "/users/" + datas.Id, values, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then(function (response) {
          console.log(response);

          Router.push("./");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <form
            className={classes.form}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <Typography className={"MuiTypography--heading"} variant={"h6"}>
                  Name.: {Userdata.Name}
                </Typography>
                <TextField
                  autoComplete="name"
                  name="Name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="New Name"
                  autoFocus
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                />
                {formik.errors.Name ? <div>{formik.errors.Name}</div> : null}
              </CardContent>
              <CardContent className={classes.content}>
                <Typography className={"MuiTypography--heading"} variant={"h6"}>
                  Username.: {Userdata.Username}
                </Typography>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="New Username"
                  name="Username"
                  autoComplete="username"
                  value={formik.values.Username}
                  onChange={formik.handleChange}
                />
                {formik.errors.Username ? (
                  <div>{formik.errors.Username}</div>
                ) : null}
              </CardContent>
              <CardContent className={classes.content}>
                <Typography className={"MuiTypography--heading"} variant={"h6"}>
                  Birth Date.: {Userdata.BirthDate}
                </Typography>
                <TextField
                  id="birthDate"
                  name="BirthDate"
                  label="New Birthday"
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
                {formik.errors.BirthDate ? (
                  <div>{formik.errors.BirthDate}</div>
                ) : null}
              </CardContent>
              <CardContent className={classes.content}>
                <Typography className={"MuiTypography--heading"} variant={"h6"}>
                  Email.: {Userdata.Email}
                </Typography>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="New Email Address"
                  name="Email"
                  autoComplete="email"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                />
                {formik.errors.Email ? <div>{formik.errors.Email}</div> : null}
              </CardContent>
              <CardContent className={classes.content}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.value}
                  onChange={formik.handleChange}
                />
                {formik.errors.Password ? (
                  <div>{formik.errors.Password}</div>
                ) : null}
              </CardContent>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Change
              </Button>
            </Card>
          </form>
        </div>
      </Container>
    </div>
  );
}

profileForm.getInitialProps = async (context) => {
  const token = context.req ? context.req.cookies.token : Cookies.get("token");
  let json = [];
  let datas = jwt.decode(token);
  console.log(token);
  //console.log(ctx);
  if (token) {
    const res = await axios.get(process.env.API_URL + "/users/" + datas.Id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(token);
    json = res.data;
  } else {
    if (context.res) {
      context.res.writeHead(301, { Location: "signin" });
      context.res.end();
      return {};
    }
    Router.push("/signin");
    return {};
  }
  return { Userdata: json[0] };
};
