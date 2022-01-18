/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from "react";
import BasicLayout from "components/BasicLayout/BasicLayout";
import { useQueryParams } from "hooks/useQueryParams";
import VerifyEmailStatus, { VERIFY_EMAIL_STATUS } from "./VerifyEmailStatus";

const VerifyEmailPage = (): React.ReactElement => {
  const { status, email } = useQueryParams<{
    status?: VERIFY_EMAIL_STATUS;
    email?: string;
  }>();
  return (
    <BasicLayout>
      <VerifyEmailStatus
        status={status}
        email={decodeURIComponent(email || "")}
      />
    </BasicLayout>
  );
};

export default VerifyEmailPage;
