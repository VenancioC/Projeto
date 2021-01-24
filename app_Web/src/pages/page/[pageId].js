//import {  }
import { CssBaseline, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Post from "../../components/Post";
import jwt from "jsonwebtoken";
import Follow from "../../components/Follow";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles((theme) => ({
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
    //margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  posts: {
    margin: "auto",
  },
}));

export default function PostPage({ pageData, postData, followData }) {
  const classes = useStyles();
  const [isFollow, setIsFollow] = useState(followData);

  const handleClickFollow = () => {
    const token = Cookies.get("token");
    if (!token) return;

    let data = jwt.decode(token);

    let body = {
      UserId: data.Id,
      PageId: pageData[0].Id,
    };

    axios
      .post("http://localhost:3001/pagefollows/", body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setIsFollow(1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClickUnFollow = () => {
    const token = Cookies.get("token");
    if (!token) return;

    let data = jwt.decode(token);

    axios
      .delete(
        "http://localhost:3001/pagefollows/" + data.Id + "/" + pageData[0].Id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        setIsFollow(0);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <Container component="main">
        <div>
          <h1>
            {pageData[0].Name}
            {Cookies.get("token") && (
              <Follow
                isFollow={isFollow}
                followFunc={handleClickFollow}
                unFollowFunc={handleClickUnFollow}
              />
            )}
          </h1>
        </div>

        <div>{pageData[0].Description}</div>
        <CssBaseline />
        <Grid item xs={12} sm={9} md={9} className={classes.posts}>
          <div className={classes.paper}>
            {postData.map((e, i) => (
              <Post key={i} postData={e} />
            ))}
          </div>
        </Grid>
      </Container>
    </div>
  );
}

PostPage.getInitialProps = async (context) => {
  const pageRes = await fetch(
    "http://localhost:3001/pages/" + context.query.pageId
  );
  const pageJson = await pageRes.json();

  const postRes = await fetch(
    "http://localhost:3001/posts/page/" + context.query.pageId
  );
  const postJson = await postRes.json();

  const token = context.req ? context.req.cookies.token : Cookies.get("token");
  let followJson = [];

  if (token) {
    try {
      let data = jwt.decode(token);

      const res = await axios.get(
        "http://localhost:3001/pagefollows/" +
          data.Id +
          "/" +
          context.query.pageId,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      followJson = res.data;
      console.log(followJson);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    pageData: pageJson,
    postData: postJson,
    followData: followJson.length > 0 ? 1 : 0,
  };
};
