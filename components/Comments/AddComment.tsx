import React from "react";
import Divider from "../Divider/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CommentContext, { useGetCommentContext } from "../../store/Comments-Context";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddComment = () => {
  const [tfValue, setTFValue] = useState<string>("");
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const {addComment, updateComments} = useGetCommentContext();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subId = router.query.subId as string;


    addComment({
      movie: subId,
      comment: {
        id: Math.random().toString(),
        comment: tfValue,
        name: `Anonymous User ${Math.floor(Math.random() * 1000)}`,
      },
    });
    updateComments(subId);
    setOpen(true);
    setTFValue("");
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <form onSubmit={submitHandler}>
      <Box>
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
            value={tfValue}
            onChange={(newValue) => setTFValue(newValue.target.value)}
          />
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Comment Posted"
        action={action}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#00b3ff;",
            color: "white",
          },
        }}
      />
    </form>
  );
};

export default AddComment;
