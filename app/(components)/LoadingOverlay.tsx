const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-10 h-10 text-gray-200 animate-spin fill-sky-500"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..."
            fill="currentColor"
          />
          <path d="M93.9676 39.0409C96.393 38.4038..." fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
