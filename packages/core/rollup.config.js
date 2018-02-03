const path        = require("path"),
      utils       = require(path.join(__dirname, "../../build/rollup/utils")),
      packageJson = require(path.join(__dirname, "package.json")),
      config      = utils.getRollupConfig(packageJson, "ngDF.core");

export default config;