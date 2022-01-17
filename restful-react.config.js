/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
    customImport: `import { getConfig } from "../config";`,
    customProps: {
      base: `{getConfig("api")}`
    }
  },
  ng: {
    output: "src/services/ng/index.tsx",
    url: "http://localhost:7457/swagger.json",
    validation: false,
    transformer: "scripts/swagger-transform.js",
    customImport: `import { getConfig } from "../config";`,
    customProps: {
      base: `{getConfig("ng/api")}`
    }
  },
  gateway: {
    output: "src/services/gateway/index.tsx",
    // url: "http://localhost:3457/api/swagger.json",
    file: "src/services/gateway/swagger.json", // we are using file instead of url because "version" field is missing in actual response
    validation: false,
    transformer: "scripts/swagger-transform.js",
    customImport: `import { getConfig } from "../config";`,
    customProps: {
      base: `{getConfig("api")}`
    }
  }
};
