import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🚨</div>
              <h1 className="text-3xl font-bold text-red-600 mb-2">
                Application Error
              </h1>
              <p className="text-gray-600">
                Something went wrong while loading the application.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-gray-800 mb-2">
                Error Details:
              </h2>
              <p className="text-red-600 font-mono text-sm">
                {this.state.error?.message}
              </p>
              {this.state.error?.stack && (
                <details className="mt-2">
                  <summary className="text-gray-600 cursor-pointer">
                    Stack Trace
                  </summary>
                  <pre className="text-xs text-gray-500 mt-2 overflow-auto max-h-40">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reload Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
              <a
                href="/test"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
              >
                Test Page
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
