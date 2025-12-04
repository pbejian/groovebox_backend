import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jestConfig = {
  testEnvironment: "node",
  rootDir: path.resolve(__dirname, ".."),
  moduleFileExtensions: ["js", "json"],
  transform: {},
  testRegex: "app.test.js",
  verbose: true,
  clearMocks: true,
  testTimeout: 60_000,
};

export default jestConfig;
