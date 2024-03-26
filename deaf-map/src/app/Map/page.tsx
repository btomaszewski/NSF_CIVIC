"use client";
import { useMapDispatch } from "@/components/GIS/Hooks/useMapDispatch";
import { MapProvider, MapState } from "@/components/GIS/MapContext";
import FilterDisplay from "@/components/GIS/components/FilterDisplay";
import { MapLayer } from "@/components/GIS/components/MapLayer";
import Map from "@arcgis/core/Map";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const MapView = dynamic(() => import("@/components/GIS/MapViewer"), {
  ssr: false,
});

export default function MapDisplay() {
  const mapDispatch = useMapDispatch();
  // const Layers: MapFeatureServer = {
  //   url: "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/arcgis/rest/services/Deaf_Map_Base_Layers/FeatureServer/",
  //   serviceType: "FeatureService",
  //   count: 5,
  // };

  const startMap = new Map({ basemap: "streets-vector" });

  const initialConfig: MapState = {
    map: startMap,
    zoomLevel: 14,
  };

  return (
    <>
      <MapProvider initialState={initialConfig}>
        <MapView />
      </MapProvider>
      {/* <MapViewer
        center={[-77.610924, 43.1566]} // Longitude, Latitude
        InputLayers={Layers}
        APIKey={process.env.ARC_API_KEY}
      ></MapViewer> */}
    </>
  );
}
