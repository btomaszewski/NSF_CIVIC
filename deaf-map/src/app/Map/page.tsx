import dynamic from "next/dynamic";

type MapLayer = import("../../components/GIS/MapViewer").BaseLayer;
type MapFeatureServer = import("../../components/GIS/MapViewer").FeatureServer;
//import MapViewer from "../../components/GIS/MapViewer";
const MapViewer = dynamic(() => import("../../components/GIS/MapViewer"), {
  ssr: false,
});

export default function Map() {
  const Layers: MapFeatureServer = {
    url: "https://services2.arcgis.com/RQcpPaCpMAXzUI5g/arcgis/rest/services/Deaf_Map_Base_Layers/FeatureServer/",
    serviceType: "FeatureService",
    count: 5,
  };
  return (
    <MapViewer
      center={[-77.610924, 43.1566]} // Longitude, Latitude
      InputLayers={Layers}
      APIKey={process.env.ARC_API_KEY}
    ></MapViewer>
  );
}
