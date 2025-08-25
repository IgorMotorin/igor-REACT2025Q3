import { Component, type ErrorInfo, type ReactNode } from 'react';

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null; errorInfo: ErrorInfo | null; hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (!this.state.hasError) {
      console.error('Error caught:', error, errorInfo);
    }
    this.setState({ error: error, errorInfo: errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2 className="font-bold text-xl mb-2">Что-то пошло не так...</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error?.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="max-w-42 min-w-24 py-2 px-2 font-medium rounded-lg transition-colors focus:outline-none bg-indigo-600 hover:bg-indigo-700 text-white active:bg-indigo-600"
          >
            Обновить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
