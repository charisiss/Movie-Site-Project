import Divider from "../Divider/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CommentContext from "../../store/Comments-Context";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";

const AddComment = () => {
  const [tfValue, setTFValue] = useState<string>("");
  const ctx = useContext(CommentContext);
  const router = useRouter();

  const submitHandler = (event: any) => {
    event.preventDefault();

    ctx.addComment({
      movie: router.query.subId,
      comment: {
        comment: tfValue,
        name: `Anonymous User ${Math.floor(Math.random() * 1000)}`,
      },
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <Box>
        <Divider size="50" title="141 Comments" />
        <br />
        <Box sx={{ display: "flex", alignItems: "flex-center" }}>
          <AccountCircle
            sx={{ color: "action.active", mr: 1.2, my: 0.7, fontSize: 50 }}
          />
          <TextField
            id="input-with-sx"
            label="Add a comment"
            variant="standard"
            size="medium"
            fullWidth
            onChange={(newValue) => setTFValue(newValue.target.value)}
          />
        </Box>
      </Box>
    </form>
  );
};

export default AddComment;
