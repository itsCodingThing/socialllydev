import React, { useState } from "react";
import { Collapse, TextField, Divider, Button, List } from "@material-ui/core";
import { addComment, deleteComment } from "../utils/api";
import { CommentList } from "./CommentList";
import { useStyles } from "./PostCard";

export function ExpandComment({ expanded, postId, comments }) {
  let [text, setText] = useState("");
  let classes = useStyles();
  let onChangeText = (e) => {
    let value = e.target.value;
    setText(value);
  };
  let onClickSend = () => {
    if (text) {
      addComment(postId, { text: text }).then(() => {
        setText("");
        window.location.reload();
      });
    }
  };
  let onClickDelete = (commentId) => {
    deleteComment(postId, commentId).then(() => {
      window.location.reload();
    });
  };
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Divider className={classes.divider} variant="middle" />
      <div className={classes.comment}>
        <div className={classes.commentTextfield}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Write a comment"
            value={text}
            onChange={onChangeText}
          />
        </div>
        <div className={classes.commentBtn}>
          <Button variant="text" onClick={onClickSend}>
            Send
          </Button>
        </div>
      </div>
      <List dense>
        {comments.map((comment) => (
          <CommentList
            key={comment._id}
            comment={comment}
            onClickDelete={onClickDelete}
          />
        ))}
      </List>
    </Collapse>
  );
}
