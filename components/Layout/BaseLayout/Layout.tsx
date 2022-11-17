import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Backdrop, Button, TextField } from "@mui/material";

import MainNavigation from "../MainNavigation/MainNavigation";
import classes from "./Layout.module.css";

type Props = {
  children?: React.ReactNode;
  pageId?: string | string[];
};

const Layout: React.FC<Props> = (props) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const pageTitle = props.pageId as string;

  return (
    <React.Fragment>
      <Head>
        <title>CSMovies {pageTitle && `- ${pageTitle}`}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <div className={classes.modal}>
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
                setOpenBackdrop(false);
              }}
            >
              CLOSE
            </Button>
            <Button variant="contained">LOG IN</Button>
          </div>
        </div>
      </Backdrop>

      <div className={classes.main}>
        <MainNavigation
          openBackdrop={() => {
            console.log("test");
            setOpenBackdrop(true);
          }}
        />

        <div className={classes.content}>{props.children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
