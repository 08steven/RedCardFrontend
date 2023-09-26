import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Grid item xs={12} sm={6} md={2}>
      <Card>
        <CardMedia
          component="img"
          alt={product.name}
          height="200"
          image={product.image}
        />
        <CardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="subtitle1">ราคา: {product.price} บาท</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;
