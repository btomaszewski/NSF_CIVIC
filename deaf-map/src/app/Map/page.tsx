import dynamic from "next/dynamic";

//import MapViewer from "../../components/GIS/MapViewer";
const MapViewer = dynamic(() => import("../../components/GIS/MapViewer"), {
  ssr: false,
});

export default function Map() {
  //const mapDiv = useRef(null);

  return <MapViewer center={[-43.1566, 77.6088]}></MapViewer>;
}
