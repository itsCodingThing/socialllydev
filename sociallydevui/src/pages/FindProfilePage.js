import React from "react";

export default function FindProfilePage(props) {
  return <div>{props.username}</div>;
}

// import React from "react";
// import { useNavigate } from "@reach/router";
// import Masonry from "react-masonry-css";

// import {
//   Container,
//   Typography,
//   Grid,
//   IconButton,
//   Avatar,
//   Button,
//   FormControl,
//   OutlinedInput,
//   InputLabel,
//   Divider,
// } from "@material-ui/core";
// import {
//   ArrowBack,
//   Facebook,
//   Twitter,
//   GitHub,
//   Instagram,
//   LocationOn,
//   Language as Web,
//   Work,
//   CalendarToday as Calender,
// } from "@material-ui/icons";
// import { styled, withStyles, makeStyles } from "@material-ui/core/styles";

// import { useProfile } from "../utils/profileContext";
// import PostCard from "../components/PostCard";
// import Posts from "../components/Posts";

// let ProfileContainer = styled("div")(({ theme }) => ({
//   marginTop: theme.spacing(1),
// }));

// let CustomAvatar = styled(Avatar)({
//   height: "150px",
//   width: "150px",
//   backgroundColor: "gray",
// });

// let ProfileAvatarContainer = styled("div")({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });

// let SocialIconContainer = styled("div")({
//   display: "flex",
//   justifyContent: "space-evenly",
//   alignItems: "center",
//   paddingLeft: "50px",
//   paddingRight: "50px",
// });

// let Section = styled("div")(({ theme }) => ({
//   display: "inline-flex",
//   alignItems: "center",
//   padding: theme.spacing(0.5),
// }));

// let BioSection = withStyles({
//   outlinedInputDisabled: {
//     color: "black",
//   },
//   inputLabelBg: {
//     backgroundColor: "whitesmoke",
//     paddingRight: "2.5px",
//     paddingLeft: "2.5px",
//     color: "black",
//   },
// })(({ classes, label, ...props }) => (
//   <FormControl fullWidth>
//     <InputLabel
//       className={classes.inputLabelBg}
//       variant="outlined"
//       htmlFor="bio-section"
//     >
//       {label}
//     </InputLabel>
//     <OutlinedInput
//       disabled
//       multiline
//       rows={4}
//       className={classes.root}
//       classes={{
//         disabled: classes.outlinedInputDisabled,
//       }}
//       id="bio-section"
//       {...props}
//     />
//   </FormControl>
// ));

// let Center = styled("div")({
//   width: "100%",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   marginBottom: "10px",
// });

// let HideSmUp = styled("div")(({ theme }) => {
//   return {
//     [theme.breakpoints.up("sm")]: {
//       display: "none",
//     },
//   };
// });

// let HideSmDown = styled("div")(({ theme }) => ({
//   [theme.breakpoints.down("sm")]: {
//     display: "none",
//   },
// }));

// let useStyles = makeStyles({
//   divider: {
//     width: "100%",
//     marginTop: "10px",
//     marginBottom: "10px",
//     paddingTop: "10px",
//     paddingBottom: "10px",
//   },
//   mGrid: {
//     display: "flex",
//     marginLeft: "-20px",
//     width: "auto",
//   },
//   mGridCol: {
//     paddingLeft: "30px",
//     backgroundClip: "padding-box",
//   },
// });

// let breakpointColumnsObj = {
//   default: 4,
//   1100: 3,
//   700: 2,
//   500: 1,
// };

// function FindProfilePage() {
//   let classes = useStyles();
//   let navigate = useNavigate();
//   let {
//     profile: { name, avatar, dob, location, company, username, bio },
//   } = useProfile();

//   let onClickBack = () => {
//     navigate("/");
//   };

//   return (
//     <Container component="main" maxWidth="lg">
//       <ProfileContainer>
//         <IconButton size="small" onClick={onClickBack}>
//           <ArrowBack />
//         </IconButton>

//         <Grid container spacing={2}>
//           {/* left profile panel */}
//           <Grid item xs={12} sm={4}>
//             <Grid container spacing={1} justify="center">
//               <Grid item xs={12}>
//                 <ProfileAvatarContainer>
//                   <CustomAvatar alt="profile img" src={avatar}>
//                     {name[0].toUpperCase()}
//                   </CustomAvatar>
//                 </ProfileAvatarContainer>
//               </Grid>

//               <Grid item xs={12}>
//                 <HideSmUp>
//                   {dob && (
//                     <Center>
//                       <Calender />
//                       <Typography variant="body1">
//                         {dob.split("-").reverse().join("-")}
//                       </Typography>
//                     </Center>
//                   )}
//                   {location && (
//                     <Center>
//                       <LocationOn />
//                       <Typography variant="body1">
//                         Live at {location}
//                       </Typography>
//                     </Center>
//                   )}
//                   {company && (
//                     <Center>
//                       <Work />
//                       <Typography variant="body1">Work at {company}</Typography>
//                     </Center>
//                   )}
//                 </HideSmUp>
//               </Grid>

//               <Grid item xs={12}>
//                 <SocialIconContainer>
//                   <IconButton size="small">
//                     <Facebook />
//                   </IconButton>
//                   <IconButton size="small">
//                     <Twitter />
//                   </IconButton>
//                   <IconButton size="small">
//                     <Instagram />
//                   </IconButton>
//                   <IconButton size="small">
//                     <GitHub />
//                   </IconButton>
//                   <IconButton size="small">
//                     <Web />
//                   </IconButton>
//                 </SocialIconContainer>
//               </Grid>
//             </Grid>
//           </Grid>

//           {/* right profile panel */}
//           <Grid item xs={12} sm={8}>
//             <Grid container direction="column" alignItems="stretch" spacing={2}>
//               <Grid item xs={12}>
//                 <Typography variant="h3" align="center">
//                   {name}
//                 </Typography>
//                 <Typography variant="h6" align="center">
//                   @{username}
//                 </Typography>
//                 <HideSmDown>
//                   <Center>
//                     {dob && (
//                       <Section>
//                         <Calender />
//                         <Typography variant="body1">
//                           {dob.split("-").reverse().join("-")}
//                         </Typography>
//                       </Section>
//                     )}

//                     {location && (
//                       <Section>
//                         <LocationOn size="small" />
//                         <Typography variant="subtitle1">{`Live at ${location}`}</Typography>
//                       </Section>
//                     )}

//                     {company && (
//                       <Section>
//                         <Work size="small" />
//                         <Typography variant="subtitle1">{`Work at ${company}`}</Typography>
//                       </Section>
//                     )}
//                   </Center>
//                 </HideSmDown>
//               </Grid>
//               <Grid item xs={12}>
//                 <BioSection label="Bio" value={bio} />
//               </Grid>

//               <Grid item xs={12}>
//                 <Button variant="contained" color="primary">
//                   Add Friend
//                 </Button>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* bottom profile panel */}
//         <div className={classes.divider}>
//           <Divider variant="middle" />
//         </div>
//         <Posts currentUser>
//           {({ isLoading, data }) => {
//             if (isLoading) {
//               return (
//                 <Typography variant="h4" align="center">
//                   Wait....
//                 </Typography>
//               );
//             }

//             return (
//               <Masonry
//                 className={classes.mGrid}
//                 columnClassName={classes.mGridCol}
//                 breakpointCols={breakpointColumnsObj}
//               >
//                 {data.map((post) => (
//                   <PostCard key={post._id} post={post} showMore />
//                 ))}
//               </Masonry>
//             );
//           }}
//         </Posts>
//       </ProfileContainer>
//     </Container>
//   );
// }

// export default FindProfilePage;
