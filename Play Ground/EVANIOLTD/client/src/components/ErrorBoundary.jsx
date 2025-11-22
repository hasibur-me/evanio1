import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-8 max-w-2xl w-full">
            <h1 className="text-3xl font-bold text-white mb-4">Something went wrong</h1>
            <p className="text-white/80 mb-4">
              An error occurred while loading the application. Please check the browser console for details.
            </p>
            {this.state.error && (
              <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-4 mb-4">
                <p className="text-red-200 font-mono text-sm">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.reload();
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

