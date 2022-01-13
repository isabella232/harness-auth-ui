import Telemetry from "@harness/telemetry";

const stubTelemetry = {
  identify: () => void 0,
  track: () => void 0,
  page: () => void 0
};

const TelemetryInstance =
  window.deploymentType !== "SAAS"
    ? stubTelemetry
    : new Telemetry(window.segmentToken);

export default TelemetryInstance;
