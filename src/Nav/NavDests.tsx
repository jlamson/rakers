const gameRoute = "game";
const pilotShipRoute = "pilotShip";

export type Route = string;

export interface FeatureRoutes {
    route: Route;
    list: Route;
    forId: (id: string) => Route;
}

interface INavDests {
    games: FeatureRoutes;
    pilotShips: FeatureRoutes;
}

function buildRoutes(baseRoute: string): FeatureRoutes {
    return {
        route: baseRoute,
        list: `${baseRoute}/list`,
        forId: (id: string) => {
            return `${baseRoute}/${id}`;
        },
    };
}

const NavDests: INavDests = {
    games: buildRoutes(gameRoute),
    pilotShips: buildRoutes(pilotShipRoute),
};

export default NavDests;
