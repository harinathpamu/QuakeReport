import React from "react";

import { themes } from "../theme";
import { ThemeContext } from "../theme";
import Header from "./Header";
import Drawer from "./Drawer";
import EarthQuakeList from "./EarthQuakeList";
import DropDown from "./DropDown";
import MinMagnitude from "./MinMagnitude";

const visual_options = ["Magnitude", "Most Recent"];
const actual_options = ["magnitude", "time"];

function App() {
  const [theme, setTheme] = React.useState(themes.dark);
  const [open, setOpen] = React.useState(false);
  const [selected_option, setOption] = React.useState(null);
  const [magnitude, setMagnitude] = React.useState(2.0);

  React.useEffect(() => {
    window.document.body.style = `background-color:${theme.background}`;
  }, [theme]);

  const onOptionChange = selected_option => {
    setOption(selected_option);
  };

  const onMagnitudeChange = magnitude => {
    setMagnitude(magnitude);
  };

  const onChangeTheme = () => {
    setTheme(() => {
      if (theme === themes.light) {
        return themes.dark;
      } else {
        return themes.light;
      }
    });
  };

  return (
    <ThemeContext.Provider value={theme}>
      <Header
        drawerHandler={() => setOpen(!open)}
        onChangeTheme={onChangeTheme}
      />
      <EarthQuakeList data={{ selected_option, magnitude }} />
      <Drawer open={open}>
        <DropDown
          visual_options={visual_options}
          actual_options={actual_options}
          onChange={onOptionChange}
        />
        <MinMagnitude onChangeValue={onMagnitudeChange} />
      </Drawer>
    </ThemeContext.Provider>
  );
}

export default App;
