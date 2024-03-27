import { ReactElement, useEffect } from "react";
import { useMapState } from "../Hooks/useMapDispatch";

interface MapAttachedObjectProps {
  children?: ReactElement | ReactElement[];
  attachmentLocation: "bottom-right" | "bottom-left" | "top-left" | "top-right";
  id: string;
}

export function MapAttachedObject({
  children,
  attachmentLocation,
  id,
}: MapAttachedObjectProps) {
  const mapState = useMapState();
  useEffect(() => {
    if (mapState.view) {
      mapState.view.ui.add(
        document.getElementById(id) as HTMLElement,
        attachmentLocation
      );
    }
  }, [mapState.view]);

  return (
    <div id={id} className="map-attached-object">
      {children}
    </div>
  );
}
