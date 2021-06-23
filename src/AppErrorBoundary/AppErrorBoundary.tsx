import React from "react";
import i18n from "./AppErrorBoundary.i18n.json";

interface AppErrorBoundaryState {
  error?: Error;
}

class AppErrorBoundary extends React.Component<unknown, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { error: undefined };

  componentDidCatch(error: Error): boolean {
    this.setState({ error });
    if (window?.bugsnagClient?.notify) {
      window?.bugsnagClient?.notify(error);
    }
    return false;
  }

  render(): React.ReactNode {
    const { error } = this.state;

    if (error) {
      return (
        <div>
          <div>{i18n.title}</div>
          <div>{i18n.subtitle}</div>
          <div>
            {i18n.please}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              {i18n.refresh}
            </a>
            {i18n.continue}
          </div>
          {import.meta.env.DEV && (
            <React.Fragment>
              <div>{error.message}</div>
              <div>
                <details>
                  <summary>{i18n.stackTrace}</summary>
                  <pre>{error.stack}</pre>
                </details>
              </div>
            </React.Fragment>
          )}
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}

export default AppErrorBoundary;
