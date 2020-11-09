import React from "react";
import {
  Avatar,
  IconButton,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

export function CommentList({
  comment: { _id: commentId, user, text },
  onClickDelete,
}) {
  return (
    <ListItem key={commentId} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src={user.avatar}>{user.name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={user.name}
        secondary={
          <Typography component="span" variant="body2" color="textPrimary">
            {text}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          color="secondary"
          edge="end"
          aria-label="delete comment"
          onClick={() => onClickDelete(commentId)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
