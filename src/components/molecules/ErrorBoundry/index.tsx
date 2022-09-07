import { Component, ErrorInfo } from 'react';

import { ErrorProps, ErrorState } from './props';

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  public state: ErrorState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <div>Error</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
