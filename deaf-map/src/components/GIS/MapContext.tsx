"use client";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as geometry from "@arcgis/core/geometry";
import {
  useReducer,
  useContext,
  createContext,
  ReactElement,
  ReducerAction,
  Dispatch,
} from "react";

export enum MapActionTypes {
  AddLayer,
  SetCenter,
  InitView,
}

type MapAction = {
  type: MapActionTypes;
  value: any;
};

export interface MapState {
  map: Map;
  APIKey?: string;
  center?: number[];
  zoomLevel?: number;
  view?: MapView;
}

function MapDispatcher(state: MapState, action: MapAction): MapState {
  if (!state.view && action.type != MapActionTypes.InitView) {
    console.log("View not set throwing away: " + action.type);
    return state;
  }

  switch (action.type) {
    case MapActionTypes.SetCenter:
      state.center = action.value as number[];
      if (state.view) {
        state.view.center = new geometry.Point({
          x: state.center[0],
          y: state.center[1],
        });
      }
      break;
    case MapActionTypes.InitView:
      state.view = action.value as MapView;
      break;
    case MapActionTypes.AddLayer:
      break;
  }

  return state;
}

const defaultState: MapState = {
  map: new Map({ basemap: "streets-vector" }),
  zoomLevel: 14,
};

interface MapProviderProps {
  children?: ReactElement | ReactElement[];
  initialState?: MapState;
}

export const MapContext = createContext(null as unknown as MapState);
export const MapDispatchContext = createContext(
  null as unknown as Dispatch<MapAction>
);

export function MapProvider({ children, initialState }: MapProviderProps) {
  const [state, dispatch] = useReducer(
    MapDispatcher,
    initialState ? initialState : defaultState
  );

  return (
    <MapContext.Provider value={state}>
      <MapDispatchContext.Provider value={dispatch}>
        {children}
      </MapDispatchContext.Provider>
    </MapContext.Provider>
  );
}
