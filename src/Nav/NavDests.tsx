import UrlPattern from "url-pattern";

const gamesPath = "games";
const gamesListPattern = new UrlPattern(`${gamesPath}`);
const gamesDetailPattern = new UrlPattern(`${gamesPath}/:id`);

const pilotShipPath = "pilotShips";
const pilotShipListPattern = new UrlPattern(`${pilotShipPath}`);
const pilotShipDetailPattern = new UrlPattern(`${pilotShipPath}/:id`);

export type Route = string;
export type RouteMatcher = (route: Route) => any | null;

type FeatureRoutes = {
    list: Route;
    matchList: (route: Route) => any;
    forId: (id: string) => Route;
    matchDetail: (route: Route) => any;
};

type INavDests = {
    games: FeatureRoutes;
    pilotShips: FeatureRoutes;
};

const NavDests: INavDests = {
    games: {
        list: gamesListPattern.stringify(),
        matchList: (route) => gamesListPattern.match(route),
        forId: (id: string) => gamesDetailPattern.stringify({ id: id }),
        matchDetail: (route) => gamesDetailPattern.match(route),
    },
    pilotShips: {
        list: pilotShipListPattern.stringify(),
        matchList: (route) => pilotShipListPattern.match(route),
        forId: (id: string) => pilotShipDetailPattern.stringify({ id: id }),
        matchDetail: (route) => pilotShipDetailPattern.match(route),
    },
};

export default NavDests;
