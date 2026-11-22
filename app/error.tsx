"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container empty-state">
      <h1>Something interrupted this page.</h1>
      <p>
        Your basket stays in this browser. Please try loading the page again.
      </p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
