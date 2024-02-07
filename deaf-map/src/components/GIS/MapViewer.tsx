"use client";
import { useEffect, useRef, ReactElement } from "react";
import Map from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import config from "@arcgis/core/config";
import ArcLayer from "@arcgis/core/layers/Layer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import "./MapViewer.css";

type LayerType = "FeatureLayer" | "FeatureService" | "VectorTileLayer";

export interface BaseLayer {
  url: string;
  serviceType: LayerType;
}

export interface FeatureServer extends BaseLayer {
  count: number;
}
//interface FeatureLayer extends BaseLayer {}

type LayerInput = BaseLayer[] | BaseLayer;

interface MapViewerProps {
  center?: Array<number>;
  APIKey?: string;
  InputLayers?: LayerInput;
}

function LayerFactory(layers: LayerInput, map: Map) {
  if (Array.isArray(layers)) {
    for (let index = 0; index < layers.length; index++) {
      const layer = layers[index];
      LayerFactory(layer, map);
    }
  } else {
    switch (layers.serviceType) {
      case "FeatureLayer":
        map.add(new FeatureLayer({ url: layers.url }));
        break;
      case "FeatureService":
        let lServer: FeatureServer = layers as FeatureServer;
        for (let i = 0; i < lServer.count; i++) {
          map.add(new FeatureLayer({ url: lServer.url + `${i}` }), i);
        }
        break;
      default:
        break;
    }
  }
}

export default function MapViewer({
  center,
  APIKey,
  InputLayers,
}: MapViewerProps) {
  const mapDiv = useRef(null);
  if (APIKey) {
    config.apiKey = APIKey;
  } else {
    console.warn("No API Key defined, functionality might be reduced");
  }

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: "streets-vector",
      });

      if (InputLayers) {
        LayerFactory(InputLayers, map);
      }

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
