import { GET_PRODUCT } from "../../gql/product.gql";
import Home from "./Home";
import { useQuery } from "@apollo/client";

const HomeWithGql = () => {
  const { loading, error, data } = useQuery(GET_PRODUCT);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return <Home products={data.items} />;
};

export default HomeWithGql;
