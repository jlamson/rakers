export type Route = string;

type FeatureRoutes = {
    list: Route;
    detail: Route;
    forId: (id: string) => Route;
};

type INavDests = {
    games: FeatureRoutes;
    pilotShips: FeatureRoutes;
};

const gamesPath = "games";
const pilotShipsPath = "pilotShips";

const NavDests: INavDests = {
    games: {
        list: `/${gamesPath}`,
        detail: `/${gamesPath}/:id`,
        forId: (id: string) => `/${gamesPath}/${id}`,
    },
    pilotShips: {
        list: `/${pilotShipsPath}`,
        detail: `/${pilotShipsPath}/:id`,
        forId: (id: string) => `/${pilotShipsPath}/${id}`,
    },
};

export default NavDests;
