import React from "react";
import axios from "axios";

import { ThemeContext } from "../theme";

function EarthQuakeList(props) {
  const theme = React.useContext(ThemeContext);
  const { data } = props;
  const [earthquakes, setEarthquakes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchEarthquakes = async () => {
      setIsLoading(true);
      const minmagnitude = parseFloat(data.magnitude);
      const orderby = data.selected_option;
      const response = await axios.get(
        "https://earthquake.usgs.gov/fdsnws/event/1/query",
        {
          params: {
            format: "geojson",
            limit: "20",
            minmagnitude: minmagnitude || 2.0,
            orderby: orderby || "time" // 'magnitude'
          }
        }
      );
      setEarthquakes(response.data.features);
      setIsLoading(false);
    };
    fetchEarthquakes();
  }, [data.selected_option, data.magnitude]);

  return (
    <div className="d-flex flex-column align-items-center">
      {isLoading ? (
        <Spinner theme={theme} />
      ) : (
        <div>
          {earthquakes.length !== 0 ? (
            earthquakes.map((data, index) => {
              return <ListItem key={index} data={data} />;
            })
          ) : (
            <p
              className="h3 text-center my-5"
              style={{ color: `${theme.foreground}` }}
            >
              No earthquakes found!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default EarthQuakeList;

function ListItem(props) {
  const theme = React.useContext(ThemeContext);
  const { data } = props;
  const splits = data.properties.place.split(" of ");
  const magnitudesplits = (data.properties.mag + "").split(".");
  const date = new Date(data.properties.time);
  return (
    <div
      className="d-flex flex-row bd-highlight justify-content-center align-items-center"
      style={{ maxWidth: "500px" }}
    >
      <div className="pr-1 py-1 d-flex justify-content-center flex-column">
        <svg width="50" height="50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill={getColorForMagnitude(data.properties.mag)}
          />
          <text fill="#fff" fontSize="16" fontFamily="Verdana" x="13" y="30">
            {magnitudesplits[0]}.
            {Math.ceil(parseFloat("0." + magnitudesplits[1]))}
          </text>
        </svg>
      </div>
      <div className="p-1 flex-grow-1 d-flex justify-content-center flex-column">
        <span className="text-uppercase text-secondary small">
          {splits[0]} OF
        </span>
        <a
          className="h6 m-0"
          style={{ color: `${theme.foreground}` }}
          href={data.properties.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {splits[1]}
        </a>
      </div>
      <div className="p-1 d-flex justify-content-center flex-column">
        <span className="text-uppercase text-secondary small d-block text-right">
          {date.toDateString()}
        </span>
        <span className="text-uppercase text-secondary small d-block text-right">
          {date.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

function Spinner(props) {
  return (
    <div
      className="spinner-grow mt-5"
      role="status"
      style={{
        margin: "auto",
        display: "block",
        color: `${props.theme.foreground}`
      }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function getColorForMagnitude(magnitude) {
  let mag_color;
  const magnitudeFloor = parseInt(Math.floor(magnitude));
  switch (magnitudeFloor) {
    case 0:
    case 1:
      mag_color = "#4A7BA7";
      break;
    case 2:
      mag_color = "#04B4B3";
      break;
    case 3:
      mag_color = "#10CAC9";
      break;
    case 4:
      mag_color = "#F5A623";
      break;
    case 5:
      mag_color = "#FF7D50";
      break;
    case 6:
      mag_color = "#FC6644";
      break;
    case 7:
      mag_color = "#E75F40";
      break;
    case 8:
      mag_color = "#E13A20";
      break;
    case 9:
      mag_color = "#D93218";
      break;
    default:
      mag_color = "#C03823";
      break;
  }
  return mag_color;
}
