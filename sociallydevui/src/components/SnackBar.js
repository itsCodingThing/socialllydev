import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, IconButton, SnackbarContent } from "@material-ui/core";
import {
  Close as CloseIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarnIcon,
} from "@material-ui/icons";
import { green, amber } from "@material-ui/core/colors";

let variantIcon = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  warn: WarnIcon,
};

let useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warn: {
    backgroundColor: amber[700],
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    opacity: 0.8,
    marginRight: theme.spacing(1),
  },
}));

function SnackBarContent({ type, msg, onClose }) {
  let classes = useStyles();
  let Icon = variantIcon[type];
  return (
    <SnackbarContent
      className={classes[type]}
      aria-describedby="message-id"
      message={
        <span id="message-id" className={classes.message}>
          <Icon className={classes.icon} />
          {msg}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

export default function SnackBar({
  msg = "no msg",
  type = "success",
  open,
  onClose,
}) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackBarContent type={type} msg={msg} onClose={onClose} />
    </Snackbar>
  );
}
