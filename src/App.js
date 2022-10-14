import { Box, Button, Grid, Input, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext } from "react";
import Canvas from "./Canvas";
import { CanvasPropsContext } from "./Context/CanvasPropsContext";
import "./styles.css";

export default function App() {
  const { setPadding } = useContext(CanvasPropsContext);

  return (
    <Container maxWidth="900px">
      <Box padding="1rem 0" width={{ xs: "100%", sm: "50%" }}>
        <Typography padding="1rem 0">Target Props :</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              size="small"
              label="Space in X"
              placeholder="Space in X"
              variant="outlined"
              onChange={(e) =>
                setPadding((padding) => ({ ...padding, x: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              size="small"
              label="Space in Y"
              placeholder="Space in Y"
              variant="outlined"
              onChange={(e) =>
                setPadding((padding) => ({ ...padding, y: e.target.value }))
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Canvas />
      <Grid container spacing={2} padding="1rem 0">
        <Grid item xs={6} sm={4} md={3}>
          <Button fullWidth variant="contained">
            Get Result
          </Button>
        </Grid>
        <Grid sm={4} md={6} />
        <Grid item xs={6} sm={4} md={3}>
          <Button fullWidth variant="contained">
            Download
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
