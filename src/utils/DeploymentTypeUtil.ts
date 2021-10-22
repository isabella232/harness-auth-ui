export const isCommunityPlan = (): boolean =>
  window.deploymentType === "COMMUNITY";

export const isOnPrem = (): boolean => window.deploymentType === "ON_PREM";

export const isSaas = (): boolean => window.deploymentType === "SAAS";
