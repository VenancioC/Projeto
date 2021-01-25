import Post from "../components/Post";
import {
  CssBaseline,
  Grid,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  posts: {
    margin: "auto",
  },
  paper: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Index({ postData }) {
  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <Container component="main">
        <CssBaseline />
        <Grid item xs={12} sm={9} md={9} className={classes.posts}>
          <div className={classes.paper}>
            {postData && postData.map((e, i) => <Post key={i} postData={e} />)}
          </div>
        </Grid>
      </Container>
    </div>
  );
}

Index.getInitialProps = async (context) => {
  const token = context.req ? context.req.cookies.token : Cookies.get("token");
  let json = [];
  let data = jwt.decode(token);
  if (!token) {
    const res = await axios.get(process.env.API_URL + "/posts/recent");
    json = res.data;
  } else {
    const res = await axios.get(process.env.API_URL + "/posts/user/" + data.Id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    json = res.data;
  }
  return { postData: json };
};
