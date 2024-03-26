"use client";
import { useEffect, useRef, ReactElement } from "react";
import Map from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import config from "@arcgis/core/config";
import ArcLayer from "@arcgis/core/layers/Layer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { setAssetPath } from "@esri/calcite-components/dist/components";

import "./MapViewer.css";
import { useMapDispatch, useMapState } from "./Hooks/useMapDispatch";
import { MapActionTypes } from "./MapContext";

export default function MapViewer({}) {
  const mapState = useMapState();
  const mapDiv = useRef(null);
  const mapDispatch = useMapDispatch();

  useEffect(() => {
    if (mapState.APIKey) {
      config.apiKey = mapState.APIKey;
    }
  }, [mapState.APIKey]);

  useEffect(() => {
    setAssetPath(window.location.href);
  }, []);

  useEffect(() => {
    if (mapDiv.current) {
      const view = new MapView({
        container: mapDiv.current,
        map: mapState.map,
        center: mapState.center,
        zoom: mapState.zoomLevel, //mapState.zoomLevel,
      });

      view
        .when(() => {
          console.log(
            "Map Loaded, center: " +
              mapState.center +
              " Zoom Level:" +
              mapState.zoomLevel
          );
        })
        .catch((error) => {
          console.error("Map loading error: ", error);
        });

      mapDispatch({ type: MapActionTypes.InitView, value: view });
    } else {
      console.warn("Map Div not available");
    }
  }, [mapDiv]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      const { latitude, longitude } = p.coords;
      mapDispatch({
        type: MapActionTypes.SetCenter,
        value: [longitude, latitude],
      });
    });
  });

  return (
    <div className={`mapViewer-style-div`}>
      <div className="mapDiv" ref={mapDiv}></div>
      {/* <FilterDisplay /> */}
    </div>
  );
}
