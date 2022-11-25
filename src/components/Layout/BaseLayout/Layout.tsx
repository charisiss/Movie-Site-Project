import React, { useState } from "react";
import Head from "next/head";

import MainNavigation from "../MainNavigation";

import classes from "./Layout.module.css";
import LoginForm from "../LoginForm";

type Props = {
  children: React.ReactNode;
  pageId?: string | string[];
};

const Layout: React.FC<Props> = (props) => {
  const [openLogin, setOpenLogin] = useState(false);
  const pageTitle = props.pageId as string;

  return (
    <React.Fragment>
      <Head>
        <title>CSMovies {pageTitle && `- ${pageTitle}`}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      {openLogin && (
        <LoginForm
          setOpenLogin={() => {
            setOpenLogin(false);
          }}
        />
      )}

      <div className={classes.main}>
        <MainNavigation
          openLogin={() => {
            setOpenLogin(true);
          }}
        />

        <div className={classes.content}>{props.children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
