"use client";

import { useState, useEffect } from "react";
import { useMapState } from "../../Hooks/useMapDispatch";
import { watch } from "@arcgis/core/core/reactiveUtils";

import "./MapDebugComponent.css";
import { MapAttachedObject } from "../MapAttachedObject";

export function SimpleComponent({}) {
  const [center, setCenter] = useState("");
  const mapState = useMapState();

  useEffect(() => {
    // Watch for changes on the View's Extent
    let handle = watch(
      () => mapState.view?.extent,
      (value) => {
        if (!value) return;
        const { latitude, longitude } = value.center;
        // Update the component's display
        setCenter(`${longitude.toFixed(4)}, ${latitude.toFixed(4)}`);
      }
    );
    // Clean up any handles or event listeners
    // created in useEffect method
    return () => handle.remove();
  }, [mapState.view]);

  return (
    <MapAttachedObject
      id="Simple-component-div"
      attachmentLocation="bottom-right"
    >
      <div className="simple-component-div">Center: {center}</div>
    </MapAttachedObject>
  );
}
