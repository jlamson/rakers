enum Resource {
    SCRAP_METAL = "SCRAP_METAL",
    PRECIOUS_METAL = "PRECIOUS_METAL",
    SALVAGE = "SALVAGE",
    ORGANICS = "ORGANICS",
    H2O = "H2O",
    ENERGY = "ENERGY",
    CAUSTIC_ALIEN_SUBSTANCES = "CAUSTIC_ALIEN_SUBSTANCES",
}

export const ResourceKeys = Object.keys(Resource) as Array<
    keyof typeof Resource
>;

export function displayText(res: Resource): string {
    switch (res) {
        case Resource.SCRAP_METAL:
            return "Scrap Metal";
        case Resource.PRECIOUS_METAL:
            return "Precious Metal";
        case Resource.SALVAGE:
            return "Salvage";
        case Resource.ORGANICS:
            return "Organics";
        case Resource.H2O:
            return "H2O";
        case Resource.ENERGY:
            return "Energy";
        case Resource.CAUSTIC_ALIEN_SUBSTANCES:
            return "CAbs (Caustic Alien suBstanceS)";
    }
}

export default Resource;
