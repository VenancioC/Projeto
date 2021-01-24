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

export default function Profile({ Userdata }) {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get("token")) {
      Cookies.set("token", "");
      router.push("/signin");
    }
  }, [Cookies.get("token")]);

  const redirect = () => {
    router.push("./profileForm");
  };

  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography className={"MuiTypography--heading"} variant={"h6"}>
                Name.: {Userdata.Name}
              </Typography>
            </CardContent>
            <CardContent className={classes.content}>
              <Typography className={"MuiTypography--heading"} variant={"h6"}>
                Username.: {Userdata.Username}
              </Typography>
            </CardContent>
            <CardContent className={classes.content}>
              <Typography className={"MuiTypography--heading"} variant={"h6"}>
                Birth Date.: {Userdata.BirthDate}
              </Typography>
            </CardContent>
            <CardContent className={classes.content}>
              <Typography className={"MuiTypography--heading"} variant={"h6"}>
                Email.: {Userdata.Email}
              </Typography>
            </CardContent>
            <Button
              onClick={redirect}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Change
            </Button>
          </Card>
        </div>
      </Container>
    </div>
  );
}

Profile.getInitialProps = async (context) => {
  const token = context.req ? context.req.cookies.token : Cookies.get("token");
  let json = [];
  let datas = jwt.decode(token);

  if (token) {
    const res = await axios.get("http://localhost:3001/users/" + datas.Id, {
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
  }
  return { Userdata: json[0] };
};
