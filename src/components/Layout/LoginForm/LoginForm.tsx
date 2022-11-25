import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Backdrop, Button, TextField } from "@mui/material";

import classes from "./LoginForm.module.css";

type Props = {
  setOpenLogin: () => void;
};

const LoginForm = (props: Props) => {
  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setOpenLogin();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <div className={classes.modal} ref={wrapperRef}>
        <div className={classes.modalTitle}>
          <h2>LOGIN</h2>
        </div>
        <br />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          className={classes.modalField}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          className={classes.modalField}
        />
        <Link href="/" className={classes.modalLink}>
          Forgot Password?
        </Link>
        <br />
        <br />
        <div>
          <Button
            variant="text"
            onClick={() => {
              props.setOpenLogin();
            }}
          >
            CLOSE
          </Button>
          <Button variant="contained">LOG IN</Button>
        </div>
      </div>
    </Backdrop>
  );
};

export default LoginForm;
