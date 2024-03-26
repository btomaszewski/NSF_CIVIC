import { useContext } from "react";
import { MapContext, MapDispatchContext } from "../MapContext";

export function useMapDispatch() {
  return useContext(MapDispatchContext);
}
export function useMapState() {
  return useContext(MapContext);
}
