import React from "react";

import { ThemeContext } from "../theme";

function MinMagnitude(props) {
  const theme = React.useContext(ThemeContext);
  const { onChangeValue } = props;
  const [value, setValue] = React.useState(2);

  React.useEffect(() => {
    if (parseInt(value) >= 1) {
      onChangeValue(value);
    }
  }, [value]);

  const onChangeHandler = event => {
    setValue(event.target.value);
  };

  return (
    <input
      className="bg-transparent border-0"
      value={value}
      onChange={onChangeHandler}
      placeholder="min-magnitude"
      style={{ outline: "none", color: `${theme.foreground}` }}
    />
  );
}

export default MinMagnitude;
