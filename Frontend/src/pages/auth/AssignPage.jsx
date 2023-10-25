import React from "react";
import { useLocation } from "react-router-dom";

function AssignPage() {
  const location = useLocation();
  const email = location.state?.email;
  return <div>AssignPage</div>;
}

export default AssignPage;
