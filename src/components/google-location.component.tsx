

import GoogleMap from './map/google-map.component';
import GooglePlace from './place/google-place.component';
import React, {  useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCBclrmg64ksdmbIImnK93ADtMA4uogFRk';
// This key was created specifically temperory for the demo.
// You need to create a new one for your application.

function loadScript(src: string, position: HTMLElement | null, id: string, 
  loadValue: { (): void; (): void; }) {
  if (!position) {
    return;
  }  
  const handler = () => {
    loadValue();
  };
  const scriptTag = document.createElement('script');
  scriptTag.setAttribute('async', '');
  scriptTag.setAttribute('id', id);
  scriptTag.src = src;

  if (document.readyState === "complete") {
    handler();
  } else {
    scriptTag.addEventListener('load', handler);
    scriptTag.removeEventListener('load', handler);
  }
  position.appendChild(scriptTag);
}

export default function GoogleLocation() {
  const loadedRef = React.useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [place, setPlace] = useState<PlaceType | null>({place_id: 'ChIJ5-rvAcdJzDERfSgcL1uO2fQ', 
  description:'', structured_formatting:{} as StructuredFormatting});
  const [placeLog, setPlaceLog] = useState<PlaceType[] | []>([]);

  function loadValue(){
    setTimeout(function(){
      setLoaded(true);
    },1000);
  }

  if (typeof window !== 'undefined' && !loadedRef.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript( `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`, document.querySelector('head'), 'google-maps', loadValue);
      loadedRef.current = true;
    }
    loadValue();
  }

  function getData(val: PlaceType){
    // do not forget to bind getData in constructor
    setPlace(val);
    if(val){
      setPlaceLog([...placeLog, { description:val.description, place_id: val.place_id, structured_formatting: val.structured_formatting } ]);
    }else{

    }
  }

  useEffect(() => {
  }, [loaded])

  return (
      <>
      <Box sx={{ pt: 2, pb: -20 }} />
      <Grid container sx={{ bgcolor: '#ffffff', height: '70vh', mt: 0 }} spacing={0}>
        <Grid item xs={8} sx={{ bgcolor: '#ffffff', height: '70vh', pr: 4 }}>
          {loaded &&
            <GoogleMap placeId={place?.place_id!} />
          }
        </Grid>
        <Grid item xs={4}>
          <Grid item xs={8}>
            <GooglePlace onPlaceChange={getData} />
          </Grid>
          <Grid item xs={8} sx={{ bgcolor: '#ffffff', pt: 2 }}>
            <TableContainer component={Paper} sx={{ bgcolor: '#ffffff', minWidth: 350, height: '60vh' }}>
              <Table sx={{ minWidth: 250, maxHeight: 600 }} size="small" aria-label="location">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>Location History</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {placeLog.map((log) => (
                    <TableRow key={log.description} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="log">
                      <LocationSearchingIcon/>
                      </TableCell>
                      <TableCell component="th" scope="log">
                      {log.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
      <Stack sx={{ width: '100%', pt: 1, pb: 10 }}>
        <Alert severity="info">Temperory API Key. This app requires an API Key. Usage limits may prevent this app from functioning properly.
          To ensure proper functionality, replace the Google Maps API Key with your own key.</Alert>
      </Stack>
    </>
  );
}


