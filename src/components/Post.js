import {
  Typography,
  Link,
  CssBaseline,
  Container,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import dateFormat from "dateformat";
import Like from "../components/Like";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import NoPost from "./NoPosts";

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
  button: {
    textAlign: "Center",
  },
}));

const Post = ({ postData }) => {
  if (!postData) return <NoPost />;

  const classes = useStyles();

  /* 
  const token = Cookies.get("token");
  let followJson = [];

  if (token) {
    try {
      let data = jwt.decode(token);
      
      console.log("http://localhost:3001/postlikes/" +
      postData.Id +
      "/" +
      data.Id);

      const res = await axios.get(
        "http://localhost:3001/postlikes/" +
          postData.Id +
          "/" +
          data.Id,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      followJson = res.data;
      //console.log(followJson);
    } catch (error) {
      console.log(error);
    }
  } */

  const [like, setLike] = useState(0);

  const handleClickLike = () => {
    const token = Cookies.get("token");
    if (!token) return;

    let data = jwt.decode(token);

    let body = {
      PostId: postData.Id,
      UserId: data.Id,
    };

    axios
      .post("http://localhost:3001/postlikes/", body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setLike(1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClickDislike = () => {
    const token = Cookies.get("token");
    if (!token) return;

    let data = jwt.decode(token);

    axios
      .delete(
        "http://localhost:3001/postlikes/" + postData[0].Id + "/" + data.Id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        setLike(0);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Link href={"/post/" + postData.Id}>
              <Typography className={"MuiTypography--heading"} variant={"h6"}>
                {postData.Title}
              </Typography>
            </Link>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Link href={"/page/" + postData.PageId}>
                  <Typography
                    className={"MuiTypography--subheading"}
                    variant={"caption"}
                  >
                    In {postData.Name}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                  By {postData.Username}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                  {!isNaN(Date.parse(postData.Date))
                    ? dateFormat(postData.Date, "dd/mm/yyyy HH:MM")
                    : ""}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={
              "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
            }
          />
          <CardContent className={classes.content}>
            <Typography
              className={"MuiTypography--subheading"}
              variant={"caption"}
            >
              {postData.Description}
            </Typography>
            <Divider className={classes.divider} light />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Like
                  like={like}
                  numLikes={postData.Likes}
                  likeFunc={handleClickLike}
                  dislikeFunc={handleClickDislike}
                />
              </Grid>
              <Grid item xs={6}>
                <Container className={classes.button}>
                  <Button disabled startIcon={<ChatBubbleIcon />}>
                    {postData.Comments} comments
                  </Button>
                </Container>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

/* Post.getInitialProps = async ({ query }) => {
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
}; */

export default Post;
