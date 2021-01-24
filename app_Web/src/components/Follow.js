import { Button } from "@material-ui/core";

const Follow = ({ isFollow, followFunc, unFollowFunc }) => {
  return (
    <Button
      variant="contained"
      color={isFollow ? "secondary" : "primary"}
      onClick={isFollow ? unFollowFunc : followFunc}
    >
      {isFollow ? "UnFollow" : "Follow"}
    </Button>
  );
};
export default Follow;
