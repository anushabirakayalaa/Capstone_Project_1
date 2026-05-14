import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, currentUser, authLoading, allowedRoles }) {
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="rounded-lg bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
          Checking your session...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/user-profile" replace />;
  }

  return children;
}

export default ProtectedRoute;
