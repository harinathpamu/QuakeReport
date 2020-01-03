import React from "react";

import { ThemeContext } from "../theme";

function DropDown(props) {
  const theme = React.useContext(ThemeContext);
  const { visual_options, actual_options, onChange } = props;
  const [open, setOpen] = React.useState(false);
  const [selected_option, setOption] = React.useState(1);

  React.useEffect(() => {
    onChange(actual_options[selected_option]);
  }, [selected_option]);

  const onChangeOption = index => {
    setOption(index);
  };

  return (
    <div
      className="d-inline-flex flex-row justidy-content-center hand position-relative "
      onClick={() => setOpen(!open)}
      onBlur={() => setOpen(false)}
      tabIndex="-1"
      style={{ outline: "none" }}
    >
      <span>{visual_options[selected_option]}</span>
      <i className="material-icons md-48" style={{ marginTop: "2px" }}>
        keyboard_arrow_down
      </i>
      {open && (
        <div
          className="d-inline-flex flex-column p-2 position-absolute shadow-sm rounded-lg border"
          style={{
            top: "25px",
            backgroundColor: `${theme.background}`
          }}
        >
          <ul
            className="list-group list-group-flush"
            style={{
              color: `${theme.foreground}`
            }}
          >
            {visual_options.map((data, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item bg-transparent p-0 pr-5 py-1 pl-2"
                  onClick={() => onChangeOption(index)}
                >
                  {data}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDown;
