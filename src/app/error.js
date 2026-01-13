'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="text-6xl font-bold text-error mb-4">⚠️</div>
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-base-content/70 mb-6 text-center max-w-md">
        {error.message || 'An unexpected error occurred'}
      </p>
      <button onClick={reset} className="btn btn-primary">
        Try Again
      </button>
    </div>
  );
}
