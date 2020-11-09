import React, { useReducer } from "react";

import { Input, Button, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  AddAPhoto as AddPhotoIcon,
  EmojiEmotions as EmojiIcon,
  Gif as GifIcon,
  CancelRounded as CancelIcon,
} from "@material-ui/icons";

import { checkTextRange } from "../utils/utils";

let useStyles = makeStyles(() => ({
  postBtn: {
    height: "100%",
    paddingTop: "5px",
  },
  mediaBtn: {
    height: "100%",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "0.5rem",
  },
  input: {
    display: "none",
  },
  imgContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    backgroundColor: "#00000061",
  },
  cancelBtn: {
    position: "absolute",
    top: "5px",
    right: "5px",
    fontSize: "2.5rem",
    color: "red",
  },
  container: {
    width: "100%",
    padding: "0.5rem",
  },
}));

let previewImgDefaults = {
  src: null,
  height: 300,
  width: 250,
};

let initialState = {
  text: "",
  img: previewImgDefaults,
};

function composeReducer(state, action) {
  switch (action.type) {
    case "UPDATE_TEXT":
      return {
        ...state,
        text: action.text,
      };

    case "UPDATE_IMG":
      return {
        ...state,
        img: action.img,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

function ComponsePost({ onSubmit }) {
  let classes = useStyles();
  let [state, dispatch] = useReducer(composeReducer, initialState);

  let onChangeText = (e) => {
    let text = e.target.value;

    if (checkTextRange(text, 100)) {
      dispatch({ type: "UPDATE_TEXT", text });
    }
  };

  let onClickClose = () => {
    dispatch({ type: "UPDATE_IMG", img: previewImgDefaults });
  };

  let onChange = (e) => {
    let file = e.target.files[0];

    if (e.target.value !== "") {
      e.target.value = "";
    }

    if (file && file.size < 200000) {
      let reader = new FileReader();
      reader.onload = () => {
        let tmpImgNode = document.createElement("img");
        tmpImgNode.src = reader.result;
        tmpImgNode.onload = () => {
          let h = tmpImgNode.naturalHeight;
          let w = tmpImgNode.naturalWidth;

          let ratio = h / w;
          let height = state.img.height;

          let width = height / ratio;

          if (width > state.img.width) {
            width = state.img.width;
          }
          dispatch({
            type: "UPDATE_IMG",
            img: { height, width, src: reader.result },
          });
        };
      };
      reader.readAsDataURL(file);
    } else {
      alert("Upload file size too big, it should be less then 200kb");
    }
  };

  let onClickSubmit = () => {
    if (state.text || state.img.src) {
      onSubmit(state.text, state.img.src);
      dispatch({ type: "RESET" });
    } else {
      alert("Empty fields");
    }
  };

  return (
    <Paper className={classes.container}>
      <Input
        disableUnderline
        fullWidth
        multiline
        placeholder="What's happening"
        rows={4}
        rowsMax={6}
        value={state.text}
        onChange={onChangeText}
        variant="standard"
      />
      {state.img.src && (
        <div className={classes.imgContainer}>
          <IconButton className={classes.cancelBtn} onClick={onClickClose}>
            <CancelIcon />
          </IconButton>
          <img
            src={state.img.src}
            alt="preview-img"
            height={state.img.height}
            width={state.img.width}
          />
        </div>
      )}
      <div className={classes.btnContainer}>
        <div className={classes.mediaBtn}>
          <input
            className={classes.input}
            type="file"
            id="upload-input"
            accept=".png, .jpg, .jpeg"
            onChange={onChange}
          ></input>
          <label htmlFor="upload-input">
            <IconButton
              component="span"
              color="primary"
              aria-label="img-upload"
            >
              <AddPhotoIcon />
            </IconButton>
          </label>
          <IconButton color="primary" aria-label="emoji-upload">
            <EmojiIcon />
          </IconButton>
          <IconButton color="primary" aria-label="gif-upload">
            <GifIcon />
          </IconButton>
        </div>
        <div className={classes.postBtn}>
          <Button
            color="primary"
            variant="text"
            onClick={onClickSubmit}
            fullWidth
          >
            Post
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default ComponsePost;
