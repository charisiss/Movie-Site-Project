import { Button } from "@mui/material";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";

import classes from "./MainNavigation.module.css";

type Props = {
  openBackdrop: () => void;
};

const MainNavigation = (props: Props) => {
  return (
    <div className={classes.navbar}>
      <Link href="/">
        <img src="/logo.png" width="200px" />
      </Link>
      <ul className={classes.navigationLink}>
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>
        <Button
          variant="outlined"
          startIcon={<PersonIcon className={classes.logButtonIcon} />}
          onClick={() => {
            props.openBackdrop();
          }}
          className={classes.logButton}
        >
          Login/Register
        </Button>
      </ul>
    </div>
  );
};

export default MainNavigation;
