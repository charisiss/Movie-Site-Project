import Divider from "../Divider/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddComment from "./AddComment";

import classes from "./Comment.module.css";

const Comment = (props: any) => {
  return (
    <div>
      <Box>
        <br />
        <Box sx={{ display: "flex", alignItems: "flex-start " }}>
          <AccountCircle
            sx={{ color: "action.active", mr: 1.2, my: 0.7, fontSize: 50 }}
          />
          <p>{props.text}</p>
        </Box>
        <p className={classes.user}>{props.user}</p>
      </Box>
    </div>
  );
};

export default Comment;
