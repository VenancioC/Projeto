import {
  CssBaseline,
  Grid,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import CreateComment from "../../components/CreateComment";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  posts: {
    margin: "auto",
  },
}));

export default function PostPage({ postData, commentData, message }) {
  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <Container component="main">
        <CssBaseline />
        <Grid item xs={12} sm={9} md={9} className={classes.posts}>
          <div className={classes.paper}>
            <Post postData={postData} />

            {Cookies.get("token") && <CreateComment postData={postData} />}
            {message
              ? message
              : commentData.map((e, i) => <Comment key={i} commentData={e} />)}
          </div>
        </Grid>
      </Container>
    </div>
  );
}

PostPage.getInitialProps = async ({ query }) => {
  const postRes = await fetch("http://localhost:3001/posts/" + query.postId);
  const postJson = await postRes.json();

  const commentRes = await fetch(
    "http://localhost:3001/comments/posts/" + query.postId
  );

  const commentJson = await commentRes.json();

  return {
    postData: postJson[0],
    commentData: commentJson,
    message: commentJson.message,
  };
};
