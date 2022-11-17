import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";

import classes from "./Comment.module.css";
import { commentType } from "../../../types/CommentType";

const Comment = (props: commentType) => {
  return (
    <div>
      <Box>
        <br />
        <Box sx={{ display: "flex", alignItems: "flex-start " }}>
          <AccountCircle
            sx={{ color: "action.active", mr: 1.2, my: 0.7, fontSize: 50 }}
          />
          <p>{props.comment}</p>
        </Box>
        <p className={classes.user}>{props.name}</p>
      </Box>
    </div>
  );
};

export default Comment;
