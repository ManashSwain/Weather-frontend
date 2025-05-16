import  { Component,type  ErrorInfo,type ReactNode } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload(); // or custom recovery logic
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center min-h-screen p-4">
          <Alert variant="destructive" className="max-w-md w-full text-center">
            <AlertTitle className="text-lg font-semibold">
              Something went wrong
            </AlertTitle>
            <AlertDescription className="mt-2 text-sm">
              {this.state.error?.message || "An unexpected error occurred."}
            </AlertDescription>
            <div className="mt-4">
              <Button variant="outline" onClick={this.handleRetry}>
                Reload Page
              </Button>
            </div>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
