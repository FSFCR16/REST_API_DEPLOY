import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
// Es un constructor que sirve paar crear un requiere y ayudar con la importacion en ECmascript
export const readJSON = (path) => require(path);
