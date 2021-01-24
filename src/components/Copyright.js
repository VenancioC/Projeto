import { Typography, Link, Box } from "@material-ui/core";

const Copyright = () => {
  return (
    <Box mt={3}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          SpaceScroll
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Copyright;