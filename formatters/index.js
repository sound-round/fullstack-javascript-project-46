import stylish from "./stylish.js";
import plain from "./plain.js";

export default function getFormatter(formatterName) {
  switch (formatterName) {
    case "stylish":
      return stylish
    case "plain":
      return plain
  }
}
