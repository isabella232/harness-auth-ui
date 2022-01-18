/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import type { IParseOptions } from "qs";

export function useQueryParams<T = Record<string, unknown>>(
  options?: IParseOptions
): T {
  const { search } = useLocation();

  const queryParams = React.useMemo(
    () => qs.parse(search, { ignoreQueryPrefix: true, ...options }),
    [search, options]
  );

  return (queryParams as unknown) as T;
}
