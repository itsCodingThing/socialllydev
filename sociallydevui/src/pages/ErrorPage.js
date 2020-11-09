import React from "react";
import { Link as RouterLink } from "@reach/router";

import { Typography, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import sorryEmoji from "../../public/assets/images/person-bowing.svg";

let useStyles = makeStyles({
  img: {
    heigth: "250px",
    width: "250px",
  },
  imgContainer: {
    heigth: "300px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

export default function ErrorPage() {
  let classes = useStyles();
  return (
    <Container>
      <Typography align="center" variant="h4">
        Your are looking for page that does not exists.
      </Typography>
      <div className={classes.imgContainer}>
        <img className={classes.img} src={sorryEmoji} alt="emoji" />
      </div>
      <div className={classes.bottom}>
        <Button
          component={RouterLink}
          to="/"
          variant="outlined"
          color="primary"
        >
          Back To Home
        </Button>
      </div>
    </Container>
  );
}
