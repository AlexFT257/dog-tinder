import { useEffect, useState } from "react";
import "./App.css";
import { Box, Grid, Card, CardContent, Typography, List, ListItem, TextField, Button } from "@mui/material";
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
      setPerroActual({name: dogNames.allRandom(), image: response.data.message})
    })
  }

  const aceptarPerro = (perroActual) => {
    setListaAceptados((listaAceptados) => [...listaAceptados, perroActual]);
    buscarImagenPerro();
  };


  return (
    <Box>
      <Grid container spacing={1} direction="row" justifyContent="space-around" alignItems="flex-start" >
        <Card>
          <CardContent>
            <img src={perroActual.image} />
            <Typography variant="h5" component="div">
              {perroActual.name}
            </Typography>
          </CardContent>
          <Button variant="contained" onClick={() => aceptarPerro(perroActual)}>Aceptar</Button>
        </Card>
        <Grid item md={4} xs={4} direction="row">
          <List>
            {listaAceptados.map((item) => (
              <ListItem key={item.name}>
                <img src={item.image} />
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
