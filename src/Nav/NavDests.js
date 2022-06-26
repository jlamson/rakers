
const gameRoute = "game";
const pilotShipRoute = "pilotShip";

const buildRoutes = (baseRoute) => {
    return {
        route: baseRoute,
        list: `${baseRoute}/list`,
        forId: (id) => { return `${baseRoute}/${id}` }
    };
};

const NavDests = { 
    games: buildRoutes(gameRoute),
    pilotShips: buildRoutes(pilotShipRoute)
};

export default NavDests;