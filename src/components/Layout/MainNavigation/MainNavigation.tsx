import Link from "next/link";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";

import classes from "./MainNavigation.module.css";

type Props = {
  openBackdrop: () => void;
};

const MainNavigation = (props: Props) => {
  return (
    <div className={classes.navbar}>
      <Link href="/" passHref>
        <a>
          <Image
            src="/logo.png"
            width={200}
            height={40}
            className={classes.img}
            alt="logo image"
          />
        </a>
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
          Login
        </Button>
      </ul>
    </div>
  );
};

export default MainNavigation;
