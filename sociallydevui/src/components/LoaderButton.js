import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

let useStyles = makeStyles({
  btnContainer: {
    display: "inline-box",
    marginTop: "10px",
  },
  btn: {
    position: "relative",
    display: "inline",
  },
  progress: {
    position: "absolute",
    zIndex: "10",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -40%)",
  },
});

export default function LoaderButton({
  load = false,
  onClick,
  disable,
  label,
  ...restProps
}) {
  let classes = useStyles();
  let progressSize = 22;
  return (
    <div className={classes.btnContainer}>
      <div className={classes.btn}>
        {load && (
          <div className={classes.progress}>
            <CircularProgress size={progressSize} />
          </div>
        )}
        <Button
          disabled={disable ? disable : load}
          onClick={onClick}
          {...restProps}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}
