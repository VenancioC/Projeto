import Post from "../components/Post";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from '../components/Navbar';

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

export default function Index({ ctx }) {
  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} className={classes.posts}>
        <div className={classes.paper}>
          {ctx.map((e, i) => (
            <Post ctx={e} />
          ))}
        </div>
      </Grid>
    </div>
  );
}

Index.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:3001/posts");
  const json = await res.json();
  return { ctx: json };
};