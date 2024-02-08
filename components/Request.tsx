import { Box, Button, Stack } from "@mui/material";
import { LatLng } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";
import Map from "./Map";
import { proxy, useSnapshot } from "valtio";

export type RequestData = {
  fromPosition: LatLng;
  toPosition: LatLng;
};

const state = proxy<{
  fromPosition?: LatLng;
  toPosition?: LatLng;
}>();

function RequestEvents() {
  const map = useMapEvents({
    click(e) {
      if (!state.fromPosition)
        state.fromPosition = e.latlng;
      else if (!state.toPosition)
        state.toPosition = e.latlng;
    },
  });

  return null;
}

export default function Request({ onRequested }: { onRequested: (request: RequestData) => void }) {
  const snap = useSnapshot(state);

  return (
    <Stack spacing={1}>
      <p>バスを予約する</p>
      <p>乗車地: {!snap.fromPosition && 'なし'}</p>
      {snap.fromPosition && <>
        <Box sx={{ width: '160px', height: '80px' }}>
          <Map containerProps={{ center: snap.fromPosition, attributionControl: false, dragging: false, scrollWheelZoom: false }}>
            {snap.fromPosition && <Marker position={snap.fromPosition} interactive={false} />}
          </Map>
        </Box>
        <p>{snap.fromPosition ? `${snap.fromPosition.lng}, ${snap.fromPosition.lat}` : 'なし'}</p>
      </>}
      <p>降車地: {!snap.toPosition && 'なし'}</p>
      {snap.toPosition && <>
        <Box sx={{ width: '160px', height: '80px' }}>
          <Map containerProps={{ center: snap.toPosition, attributionControl: false, dragging: false, scrollWheelZoom: false }}>
            {snap.toPosition && <Marker position={snap.toPosition} interactive={false} />}
          </Map>
        </Box>
        <p>{snap.toPosition ? `${snap.toPosition.lng}, ${snap.toPosition.lat}` : 'なし'}</p>
      </>}
      {(!snap.fromPosition || !snap.toPosition) && <>
        <p>{!snap.fromPosition ? '乗車地を設定する:' : '降車地を設定する:'}</p>
        <Box sx={{ height: '320px' }}>
          <Map>
            {snap.fromPosition && <Marker position={snap.fromPosition} interactive={false} />}
            {snap.toPosition && <Marker position={snap.toPosition} interactive={false} />}
            <RequestEvents />
          </Map>
        </Box>
      </>}
      {snap.fromPosition && snap.toPosition &&
        <Box>
          <Button variant="contained" onClick={() => { onRequested(snap as RequestData) }}>
            予約する
          </Button>
        </Box>
      }
    </Stack>
  );
}