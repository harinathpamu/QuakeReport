import React from "react";

import { ThemeContext } from "../theme";

function Drawer(props) {
  const { open, children } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <div
      className={`sidenav shadow-sm border-left${
        open ? " navopen" : " navclose"
      }`}
      style={{
        backgroundColor: `${theme.background}`
      }}
      aria-hidden={!open}
    >
      <div
        className="d-flex flex-column p-2 text-nowrap"
        style={{ color: `${theme.foreground}` }}
      >
        <div className="p-2 border-bottom">
          <p className="h6 m-0">Order By</p>
          {children[0]}
        </div>
        <div className="p-2">
          <p className="h6 m-0">Minimum Magnitude</p>
          {children[1]}
        </div>
      </div>
    </div>
  );
}

export default Drawer;
