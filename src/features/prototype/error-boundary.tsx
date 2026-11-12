import { Component, type ReactNode } from "react";
import { Link } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";

// Catches unexpected render errors so participants see a recovery path instead of a blank page.
// React reports the caught error to the console itself; nothing else is logged here because
// errors can carry private free text from the scenario.
export class RenderErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="prototype-section" role="alert" aria-labelledby="render-error-title">
        <h1 id="render-error-title">Coś poszło nie tak</h1>
        <p className="my-5">
          Ten widok nie wyświetlił się z powodu nieoczekiwanego błędu. Twoje dane zostają w tej
          przeglądarce. Spróbuj ponownie albo przejdź do ustawień danych, aby je wyeksportować,
          zaimportować lub zresetować scenariusz.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Button type="button" onClick={() => this.setState({ failed: false })}>
            Spróbuj ponownie
          </Button>
          <Link
            className={buttonVariants({ variant: "outline" })}
            to="/app/settings"
            onClick={() => this.setState({ failed: false })}
          >
            Ustawienia danych
          </Link>
        </div>
      </section>
    );
  }
}
