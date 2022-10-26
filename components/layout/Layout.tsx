import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import classes from "./Layout.module.css";
import { Backdrop, Button, TextField } from "@mui/material";
import MainNavigation from "./MainNavigation";

type Props = {
  children?: React.ReactNode;
  pageId?: string | string[];
};

const Layout: React.FC<Props> = (props) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <div className={classes.backdrop}>
          <div className={classes.backdropTitle}>
            <h2>LOGIN</h2>
          </div>
          <br />
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            className={classes.backdropField}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className={classes.backdropField}
          />
          <Link href="/" className={classes.backdropLink}>
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
      <Head>
        <title>CSMovies {props.pageId && `- ${props.pageId.toString()}`}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
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
