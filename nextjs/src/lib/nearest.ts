import nearestColor from "nearest-color";
import { colornames } from "color-name-list";

// nearestColor expects an object {name => hex}
const colors = colornames.reduce(
  (o, { name, hex }) => Object.assign(o, { [name]: hex }),
  {},
);

const nearest = nearestColor.from(colors);

export const getColorName = (color: string) => nearest(color);
