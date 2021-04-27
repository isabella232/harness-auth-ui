/**
 * Please match the config key to the directory under services.
 * This is required for the transform to work
 */

module.exports = {
  portal: {
    output: "src/services/portal/index.tsx",
    // url: "http://localhost:3457/api/swagger.json",
    file: "src/services/portal/swagger.json", // we are using file instead of url because "version" field is missing in actual response
    validation: false,
    transformer: "scripts/swagger-transform.js",
    customProps: {
      base: `{'/gateway/api'}`
    }
  },
  ng: {
    output: "src/services/ng/index.tsx",
    url: "http://localhost:7457/swagger.json",
    validation: false,
    transformer: "scripts/swagger-transform.js",
    customProps: {
      base: `{'/gateway/ng/api'}`
    }
  }
};
