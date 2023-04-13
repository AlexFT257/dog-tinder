import { useEffect, useState } from "react";
import "./App.css";
import { Box, Grid, Card, CardContent, CardMedia, Typography, List, ListItem, TextField, Button, ImageList } from "@mui/material";
import axios from "axios";
import dogNames from "dog-names"


function App() {
  const [listaRechazados, setListaRechazados] = useState([]);
  const [listaAceptados, setListaAceptados] = useState([]);
  const [perroActual, setPerroActual] = useState({ name: '', image: '' });

  useEffect(() => {
    buscarImagenPerro();
  }, [])

  const buscarImagenPerro = () => {
    axios.get('https://dog.ceo/api/breeds/image/random').then((response) => {
      setPerroActual({ name: dogNames.allRandom(), image: response.data.message })
    })
  }

  const aceptarPerro = (perroActual) => {
    setListaAceptados((listaAceptados) => [...listaAceptados, perroActual]);
    buscarImagenPerro();
  };

  const rechazarPerro = (perroActual) => {
    setListaRechazados((listaRechazados) => [...listaRechazados, perroActual]);
    buscarImagenPerro();
  };

  function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Box justifyContent="space-between">
      <Grid container spacing={0} direction="row" justifyContent="space-between" alignItems="stretch" >
        <Grid item xs={4} direction="row" sx={{ background: "red" }}>
          <ImageList rowHeight={100} cols={1} >
            {listaRechazados.map((item) => (
              <Card xs={4} direction="column" key={item.name} >
                <CardMedia component="img" style={{ width: "100%", height: "100%", objectFit: "contain" }} loading="lazy" image={item.image} />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={4} direction="row" sx={{ background: "gray" }}>
          <Card xs={4} direction="column" >
            <CardMedia component="img" style={{ width: "100%", height: "200px", objectFit: "contain" }} loading="lazy" image={perroActual.image} />
            <CardContent>
              <Typography variant="h5" component="div">
                {perroActual.name}
              </Typography>
            </CardContent>
            <Button variant="contained" onClick={() => rechazarPerro(perroActual)}>Rechazar</Button>
            <Button variant="contained" onClick={() => aceptarPerro(perroActual)}>Aceptar</Button>
          </Card>
        </Grid>
        <Grid item xs={4} direction="row" sx={{ background: "green" }}>
          <List>
            {listaAceptados.map((item) => (
              <Card xs={4} direction="column" key={item.name} >
                <CardMedia component="img" style={{ width: "100%", height: "100%", objectFit: "contain" }} loading="lazy" image={item.image} />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
