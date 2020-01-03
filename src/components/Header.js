import React from "react";

import logo from "../assets/images/ic_launcher.png";
import { ThemeContext } from "../theme";

function Header(props) {
  const { onChangeTheme } = props;
  const theme = React.useContext(ThemeContext);
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    onChangeTheme();
  }, [toggle]);

  return (
    <header className="sticky-top">
      <nav
        className="navbar navbar-light shadow-sm border-bottom"
        style={{ backgroundColor: `${theme.background}` }}
      >
        <a
          className="navbar-brand"
          href="/"
          style={{ color: `${theme.foreground}` }}
        >
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top mx-2"
            alt="brand_logo"
          />
          Quake Report
        </a>
        <div>
          <i
            className="material-icons md-48 hand mr-3"
            onClick={() => setToggle(!toggle)}
            style={{ color: `${theme.foreground}` }}
          >
            {toggle ? "wb_sunny" : "brightness_3"}
          </i>
          <i
            className="material-icons md-48 hand"
            onClick={props.drawerHandler}
            style={{ color: `${theme.foreground}` }}
          >
            menu
          </i>
        </div>
      </nav>
    </header>
  );
}

export default Header;
