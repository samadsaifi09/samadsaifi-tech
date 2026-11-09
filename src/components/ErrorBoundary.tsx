import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/40">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-light text-platinum-gradient">
              Renderer Recovery Engaged
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              A GPU rendering context or memory boundary was caught. Click below to re-initialize orbital telemetry.
            </p>
            <button
              onClick={this.handleReload}
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-mono text-xs flex items-center gap-2 mx-auto shadow-lg"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload & Reset Viewport</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
