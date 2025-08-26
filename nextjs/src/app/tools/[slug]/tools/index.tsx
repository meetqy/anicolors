import { ChangeSvgColor } from "./change-svg-color";
import { ColorNameTableSearchGenerator } from "./color-names-table-search-and-filter-colors";
import { CreateCinematicGenerator } from "./create-cinematic-color-palettes-with-colorpalette-cinema";

const toolComponents = {
  "change-svg-color": ChangeSvgColor,
  "color-name-table-search-and-filter-colors": ColorNameTableSearchGenerator,
  "create-cinematic-color-palettes-with-colorpalette-cinema":
    CreateCinematicGenerator,
};

export default toolComponents;
