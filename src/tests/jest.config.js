import { defaults } from "jest-config";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  verbose: true,
  moduleDirectories: [...defaults.moduleDirectories, "bower_components"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  roots: [`${path.join(__dirname, "..")}`],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
