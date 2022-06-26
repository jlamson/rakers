import { useContext } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { NavContext } from "./NavContext";

const Navigator = () => {
    const [currentDest, navigateTo] = useContext(NavContext)
    // if (currentDest.startsWith(NavDests.game.route)) {
    //     if (currentDest == NavDests.game.list) {
    //         content = <h1>Game List</h1>
    //     } else {
    //         content = <h1>Game/id: {currentDest</h1>
    //     }
    // } else if (currentDest.startsWith(NavDests.pilotShips.route)) {
    // 
    // }
    // return content;
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <h1>{currentDest}</h1>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Navigator