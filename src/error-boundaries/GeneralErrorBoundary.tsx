import React from "react";
import { telemetryManager } from "..";
import { TelemetryAttributes } from "../telemetry/TelemetryAttributes";
import styles from "./GeneralErrorBoundary.module.css";

export class GeneralErrorBoundary extends React.Component<
  any,
  { hasError: false }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    telemetryManager.logInfo(
      TelemetryAttributes.GENERAL_ERROR +
        " " +
        error.toString() +
        " - " +
        errorInfo.componentStack,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles["error-container"]}>
          <h1>Upps. Algo no salió como esperabamos...</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
