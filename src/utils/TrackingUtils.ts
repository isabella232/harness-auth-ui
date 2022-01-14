export function getUTMInfoParams(urlParams?: URLSearchParams): string {
  const utmCampaign = urlParams?.get("utm_campaign");
  const utmCampaignParam = utmCampaign ? `&utm_campaign=${utmCampaign}` : "";

  const utmSource = urlParams?.get("utm_source");
  const utmSourceParam = utmSource ? `&utm_source=${utmSource}` : "";

  const utmTerm = urlParams?.get("utm_term");
  const utmTermParam = utmTerm ? `&utm_term=${utmTerm}` : "";

  const utmContent = urlParams?.get("utm_content");
  const utmContentParam = utmContent ? `&utm_content=${utmContent}` : "";

  const utmMedium = urlParams?.get("utm_medium");
  const utmMediumParam = utmMedium ? `&utm_medium=${utmMedium}` : "";

  return `${utmCampaignParam}${utmSourceParam}${utmTermParam}${utmContentParam}${utmMediumParam}`;
}
