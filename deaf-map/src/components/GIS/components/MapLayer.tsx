"use client";

import { useContext, useEffect } from "react";
import { useMapDispatch } from "../Hooks/useMapDispatch";
import { MapActionTypes } from "../MapContext";

interface MapLayerProps {
  layerRef: string;
}

export function MapLayer({ layerRef }: MapLayerProps) {
  const MapDispatchContext = useMapDispatch();
  useEffect(() => {
    MapDispatchContext({ value: layerRef, type: MapActionTypes.AddLayer });
  }, []);
  return <></>;
}
