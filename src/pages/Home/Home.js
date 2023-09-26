import Grid from "@mui/material/Unstable_Grid2";
import { useState, useEffect } from "react";
import ProductList from "../../components/ProductList";

export default function Home(props) {
  const { products } = props;
  console.log(products);
  let [onSignin, setOnSignin] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: "40px",
        margin: "0px",
      }}
    >
      <ul>
        <ProductList products={products} />
      </ul>
    </Grid>
  );
}
