"use client";
import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import config from "@arcgis/core/config";

import "./MapViewer.css";

type MapViewerProps = {
  center?: Array<number>;
  APIKey?: string;
};

export default function MapViewer({ center, APIKey }: MapViewerProps) {
  const mapDiv = useRef(null);
  config.apiKey =
    "AAPKbb819e3165fa4ab084c9b0fddef7a931Q9WxrEzWu5L3sOIM76FBUiKz7u67qoeCqwZvSCqsdh84t-MyCqu3lQJukCV-TIYN";
  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: "streets-vector",
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: center,
        zoom: 12,
      });

      view.when(() => {
        console.log("Map Loaded, center: " + center);
      });
    }
  }, [mapDiv]);

  return <div className="mapDiv" ref={mapDiv}></div>;
}
