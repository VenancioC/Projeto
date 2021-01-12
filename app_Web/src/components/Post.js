import {
  Typography,
  Link,
  Box,
  CssBaseline,
  Container,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import dateFormat from "dateformat";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

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

const Post = (props) => {
  console.log(props);
  let like;
  if (1 == 1) {
    like = <ThumbUpIcon />;
  } else {
    like = <ThumbUpOutlinedIcon />;
  }
  const classes = useStyles();
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography className={"MuiTypography--heading"} variant={"h6"}>
              {props.ctx.Title}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                  By {props.ctx.Username}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                  {dateFormat(props.ctx.Date, "longDate")}
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
              {props.ctx.Description}
            </Typography>
            <Divider className={classes.divider} light />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                  {like}
                  <span>15 m likes</span>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                  <ChatBubbleIcon />
                  <div className={classes.likesComment}>
                    
                    15 comments
                  </div>
                </Typography>
              </Grid>
            </Grid>
            {/* {faces.map((face) => (
              <Avatar className={classes.avatar} key={face} src={face} />
            ))} */}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Post;
