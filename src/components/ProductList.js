import React from "react";
import { Container, Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <Container>
      <Grid container spacing={3}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
