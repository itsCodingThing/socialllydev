import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    width: "80vw",
    height: "80vh",
  },
  img: {},
}));
// padding: theme.spacing(2, 4, 3),

function calculateHeight(src, width) {
  let imgEle = document.createElement("img");

  return new Promise((res, rej) => {
    imgEle.src = src;
    imgEle.onload = () => {
      let { naturalHeight, naturalWidth } = imgEle;
      let factor = naturalHeight / naturalWidth;

      let height = factor * width;
      res({ width, height });
    };

    imgEle.onerror = (err) => {
      rej(err);
    };
  });
}

let defaultHW = {
  width: 300,
  height: 200,
};
function Img({ src, alt, ...rest }) {
  let [state, setState] = useState(defaultHW);

  useEffect(() => {
    calculateHeight(src, defaultHW.width).then(({ width, height }) => {
      setState({ width, height });
    });
  }, [src]);

  return (
    <img
      {...rest}
      alt={alt}
      src={src}
      height={state.height}
      width={state.width}
    />
  );
}

function PostHoverModel({ open, toggleModel, data: { src } }) {
  let classes = useStyles();

  return (
    <Modal
      onClose={toggleModel}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <div className={classes.container}>
        <Img src={src} className={classes.img} alt="post" />
      </div>
    </Modal>
  );
}
export default PostHoverModel;
