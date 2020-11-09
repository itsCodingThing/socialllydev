import React, { useState } from "react";
import { Grid, TextField, Container, Button, Avatar } from "@material-ui/core";
import { styled, withStyles } from "@material-ui/core/styles";
import { updateUserProfile } from "../utils/api";
import { useProfile } from "../utils/profileContext";
import LoaderButton from "../components/LoaderButton";
import { saveProfile } from "../utils/localStorage";

let Form = styled("form")({
  paddingTop: "1rem",
});

let Input = styled("input")({
  display: "none",
});

let UploadBtn = styled("div")({
  display: "inline-flex",
  marginLeft: "15px",
});

let PreviewAvatar = withStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { width: theme.spacing(25), height: theme.spacing(25) },
}))(({ classes, children, ...avatarProps }) => (
  <div className={classes.container}>
    <Avatar className={classes.avatar} {...avatarProps}>
      {children}
    </Avatar>
  </div>
));

function ProfileFormPage() {
  let { profile, setProfile } = useProfile();

  let [form, setForm] = useState({ ...profile });
  let [load, setLoad] = useState(false);
  let [img, setImg] = useState({
    src: profile.avatar ? profile.avatar : null,
    height: 300,
    width: 250,
  });

  let onClickSubmit = () => {
    setLoad(true);

    let payload = {
      ...form,
      avatar: img.src,
    };
    updateUserProfile(payload)
      .then((profile) => {
        saveProfile(profile);
        setProfile(profile);
        setLoad(false);
        window.location.reload();
      })
      .catch(() => {
        setLoad(false);
      });
  };

  let onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  let selectFile = (e) => {
    let file = e.target.files[0];
    if (file && file.size < 200000) {
      let reader = new FileReader();
      reader.onload = () => {
        let tmpImgNode = document.createElement("img");
        tmpImgNode.src = reader.result;
        tmpImgNode.onload = function () {
          let h = tmpImgNode.naturalHeight;
          let w = tmpImgNode.naturalWidth;

          let ratio = h / w;
          let height = img.height;

          let width = height / ratio;

          if (width > 300) {
            width = 300;
          }

          setImg({ ...img, src: reader.result, width });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="md">
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PreviewAvatar src={img.src}>{profile.name[0]}</PreviewAvatar>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              placeholder="Your full name"
              name="name"
              value={form.name}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              placeholder="Unique username"
              name="username"
              value={form.username}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="DOB"
              type="date"
              name="dob"
              value={form.dob}
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={5}
              variant="outlined"
              label="Bio"
              placeholder="Tell us something about your self"
              name="bio"
              value={form.bio}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Work Place"
              placeholder="Your company name"
              name="company"
              value={form.company}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Location"
              placeholder="Your current location"
              name="location"
              value={form.location}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12}>
            <LoaderButton
              load={load}
              onClick={onClickSubmit}
              color="primary"
              variant="contained"
              label="Save"
            />
            <UploadBtn>
              <Input
                type="file"
                id="avatar-upload"
                accept=".png, .jpg, .jpeg"
                onChange={selectFile}
              />
              <label htmlFor="avatar-upload">
                <Button component="span" color="primary" variant="contained">
                  Upload Image
                </Button>
              </label>
            </UploadBtn>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
}

export default ProfileFormPage;
