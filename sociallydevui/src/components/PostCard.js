import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  LinearProgress,
} from "@material-ui/core";
import {
  Favorite as FavoriteIcon,
  MoreVert as MoreVertIcon,
  AddComment as CommentIcon,
} from "@material-ui/icons";
import { makeStyles, styled } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

import dayjs from "dayjs";
import { useAuth } from "../utils/authContext";
import { deletePost } from "../utils/api";
import PostHoverModel from "./PostHoverModel";
import { ExpandComment } from "./ExpandComment";

let CardContainer = styled("div")(() => ({
  paddingBottom: "0.5rem",
}));

export let useStyles = makeStyles({
  card: {
    width: "100%",
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    cursor: "pointer",
  },
  avatar: {
    backgroundColor: red[500],
  },
  iconBtn: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "center",
  },
  iconCount: {
    display: "flex",
    alignItems: "center",
  },
  loader: {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  comment: {
    display: "flex",
    flexDirection: "row",
    paddingRight: "10px",
    paddingLeft: "10px",
  },
  commentAvatar: {
    padding: "0",
  },
  commentTextfield: {
    marginLeft: "5px",
    width: "100%",
  },
  commentBtn: {
    marginLeft: "5px",
    paddingTop: "2px",
  },
  divider: {
    marginBottom: "20px",
  },
  p: {
    marginTop: "10px",
    marginBottop: "10px",
  },
});

export default function PostCard({
  showMore = false,
  showComments = false,
  post: {
    _id: postId,
    description,
    user: { name, avatar },
    date,
    comments,
    likes,
    image,
  },
}) {
  let classes = useStyles();
  let {
    auth: { authorized },
  } = useAuth();

  let [expanded, setExpanded] = useState(false);
  let [anchor, setAnchor] = useState(null);
  let [showProgress, setProgress] = useState(false);
  let [open, setModelOpen] = useState(false);

  let time = dayjs(date).format("dddd, MMM D YY");

  let togglePostHoverModel = () => {
    setModelOpen(!open);
  };

  let toggleMore = (event) => {
    if (!anchor) {
      setAnchor(event.currentTarget);
    } else {
      setAnchor(null);
    }
  };

  let onClickEdit = () => {
    toggleMore();
  };

  let onClickLike = () => {};

  let onClickComment = () => {
    setExpanded(!expanded);
  };

  let onClickDelete = () => {
    toggleMore();
    setProgress(true);
    deletePost(postId).then(() => {
      setProgress(false);
      window.location.reload();
    });
  };

  return (
    <CardContainer>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src={avatar} aria-label="recipe" className={classes.avatar}>
              {name[0]}
            </Avatar>
          }
          action={
            showMore && (
              <>
                <IconButton onClick={toggleMore} aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchor}
                  keepMounted
                  open={Boolean(anchor)}
                  onClose={toggleMore}
                >
                  <MenuItem onClick={onClickDelete}>Delete</MenuItem>
                  <MenuItem onClick={onClickEdit}>Edit</MenuItem>
                </Menu>
              </>
            )
          }
          title={name}
          subheader={time}
        />
        {image && (
          <CardMedia
            onClick={togglePostHoverModel}
            className={classes.media}
            image={image}
            title={name}
          />
        )}
        <CardContent>
          <Typography component="p">{description}</Typography>
        </CardContent>
        {authorized && (
          <>
            <CardActions>
              <div className={classes.iconBtn}>
                <IconButton aria-label="add to favorites" onClick={onClickLike}>
                  <FavoriteIcon />
                </IconButton>
                <Typography
                  className={classes.iconCount}
                  variant="body1"
                  align="center"
                >
                  {likes.length === 0 ? "" : likes.length}
                </Typography>
              </div>
              <div className={classes.iconBtn}>
                <IconButton onClick={onClickComment}>
                  <CommentIcon />
                </IconButton>
                <Typography
                  className={classes.iconCount}
                  variant="body1"
                  align="center"
                >
                  {comments.length === 0 ? "" : comments.length}
                </Typography>
              </div>
            </CardActions>
            {showComments && (
              <ExpandComment
                expanded={expanded}
                postId={postId}
                comments={comments}
              />
            )}
          </>
        )}
        {showProgress && <LinearProgress />}
      </Card>
      {open && (
        <PostHoverModel
          open={open}
          toggleModel={togglePostHoverModel}
          data={{ src: image }}
        />
      )}
    </CardContainer>
  );
}
