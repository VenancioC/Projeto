import { Button } from "@material-ui/core";

const Follow = ({ isFollow, followFunc, unFollowFunc }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color={isFollow ? "secondary" : "primary"}
      onClick={isFollow ? unFollowFunc : followFunc}
    >
      {isFollow ? "UnFollow" : "Follow"}
    </Button>
  );
};
export default Follow;
