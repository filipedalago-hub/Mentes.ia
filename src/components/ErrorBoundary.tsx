import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { errorTracking } from '../lib/errorTracking';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    errorTracking.captureException(error, {
      context: 'ErrorBoundary',
      componentStack: errorInfo.componentStack,
    });

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/app';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-dark flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-dark-lighter border border-titanium/30 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>

              <h1 className="text-2xl font-bold text-soft-white mb-3">
                Ops! Algo deu errado
              </h1>

              <p className="text-soft-gray mb-6">
                Encontramos um erro inesperado. Nossa equipe foi notificada e já está trabalhando na solução.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="w-full mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left">
                  <summary className="cursor-pointer text-sm font-medium text-red-400 mb-2">
                    Detalhes do erro (desenvolvimento)
                  </summary>
                  <pre className="text-xs text-red-300 overflow-auto max-h-40">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={this.handleReset}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                  Tentar novamente
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-titanium text-soft-white font-semibold rounded-xl hover:bg-titanium/80 transition-all"
                >
                  <Home className="w-5 h-5" />
                  Ir para início
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
