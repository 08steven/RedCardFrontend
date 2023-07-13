import Grid from '@mui/material/Unstable_Grid2'
import MediaCard from '../components/MediaCard';
import Signin from '../components/Signin';
import { useState, useEffect } from 'react';


export default function Home() {
    let [onSignin, setOnSignin] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()


    function signin() {
        setOnSignin(<Signin />)
    }

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else
        return (
            <Grid container spacing={2} sx={{
                padding: '40px',
                margin: '0px'
            }}>

                <button onClick={signin}>Login</button>
                {onSignin}

                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name} {item.price} {item.image} {item.detail} {item.price} {item.category.name}
                        </li>
                    ))}
                </ul>

            </Grid >

        );
}