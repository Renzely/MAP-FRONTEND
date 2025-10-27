import { Outlet, Navigate, useLocation } from "react-router-dom";

const Path = () => {
  const checkLoggedIn = localStorage.getItem("isLoggedIn");
  const location = useLocation();
  const path = location.pathname;

  // If not logged in, redirect to login for all protected routes
  if (checkLoggedIn === null) {
    if (path === "/" || path === "/forgotpassword") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  }

  // If logged in, redirect to the default logged-in route
  if (checkLoggedIn !== null) {
    switch (path) {
      case "/":
      case "/forgotpassword":
        return <Navigate to="/view-accounts" />;
      case "/view-accounts":
      case "/view-admin-accounts":
      case "/view-bmpowerHO":
      case "/view-asianstreak":
      case "/view-ecossentialfoods":
      case "/view-ecossentialfoodsHO":
      case "/view-engkanto":
      case "/view-magis":
      case "/view-pldt":
      case "/view-royalcanin":
      case "/view-shelfmate":
      case "/view-spx":

      case "/view-marabouHO":
      case "/view-longtable":
      case "/view-carmensbest":
      case "/view-metropacific":
      case "/view-metropacificfresh":
      case "/view-universalharvester":
      case "/view-jgyu":
        return <Outlet />;
      default:
        console.log("Unknown path, redirecting to default route.");
        return <Navigate to="/view-accounts" />;
    }
  }

  // Fallback case, should not reach here
  return <Navigate to="/" />;
};

export default Path;
