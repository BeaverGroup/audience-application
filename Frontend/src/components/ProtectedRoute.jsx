import React from "react";
import { Route, Navigate } from "react-router-dom";
import { UserStateContext } from "./App"; // import your context

function ProtectedRoute({ roles, element, redirectTo, ...rest }) {
  const { userState } = React.useContext(UserStateContext);

  // Check if user is authenticated
  if (userState) {
    // Check if user role is allowed
    if (!roles || roles.includes(userState.role)) {
      return <Route {...rest} element={element} />;
    } else {
      // Redirect to a forbidden page or main page if user role is not allowed
      return <Navigate to={redirectTo} />;
    }
  } else {
    // Redirect to login page if user is not authenticated
    return <Navigate to={redirectTo} />;
  }
}

export default ProtectedRoute;
