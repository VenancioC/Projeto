import { Button, Container } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    textAlign: "center",
  },
}));

const Like = ({ like, numLikes, likeFunc, dislikeFunc }) => {
  const classes = useStyles();
  let text = numLikes ? numLikes : 0 + " likes";

  return (
    <Container className={classes.button}>
      <Button
        startIcon={like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
        onClick={like ? dislikeFunc : likeFunc}
      >
        {text}
      </Button>
    </Container>
  );
};
export default Like;
