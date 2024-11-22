const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center space-x-2">
        {/* Spinning Circle */}
        <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        {/* Loading Text */}
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
