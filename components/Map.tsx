import { mapCenter } from "@/lib/sample";
import { ComponentProps } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

export default function Map({
  children,
  containerProps,
}: {
  children?: React.ReactNode;
  containerProps?: ComponentProps<typeof MapContainer>;
}) {
  return (
    <MapContainer
      style={{
        width: '100%',
        height: '100%',
      }}
      center={mapCenter}
      zoom={13}
      {...containerProps}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}