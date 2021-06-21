import React, { useEffect, useState } from "react";
import { VerifyTokenPathParams } from "services/ng/index";
import { useVerifyToken } from "services/ng";
import { useParams } from "react-router-dom";
import { EMAIL_VERIFY_STATUS } from "utils/StringUtils";

export const VerifyEmail: React.FC = () => {
  const { token } = useParams<VerifyTokenPathParams>();
  const { mutate: verifyToken, loading } = useVerifyToken({
    token: token,
    requestOptions: { headers: { "content-type": "application/json" } }
  });

  const [msg, setMsg] = useState<EMAIL_VERIFY_STATUS>(
    EMAIL_VERIFY_STATUS.IN_PROGRESS
  );
  const baseUrl = window.location.pathname.replace("auth/", "");

  const handleVerifyToken = async (): Promise<void> => {
    try {
      const response = await verifyToken();
      if (response?.resource?.accountIdentifier) {
        window.location.href = `${baseUrl}ng/#/account/${response.resource.accountIdentifier}/home/projects?verify=true`;
      }
    } catch (error) {
      window.location.href = `${baseUrl}auth/#/signin?errorCode=email_verify_fail`;
    }
  };

  useEffect(() => {
    let isMounted = true;
    handleVerifyToken()
      .then(() => {
        if (isMounted) {
          setMsg(EMAIL_VERIFY_STATUS.SUCCESS);
        }
      })
      .catch(() => {
        if (isMounted) {
          setMsg(EMAIL_VERIFY_STATUS.FAILED);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setMsg(EMAIL_VERIFY_STATUS.IN_PROGRESS);
  }, [loading]);

  return <div>{msg}</div>;
};
