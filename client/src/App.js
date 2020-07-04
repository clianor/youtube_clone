import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import CustomRoute from "./components/common/router";

// base components
import Navbar from "./components/base/Navbar/Navbar";

// pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <CustomRoute exact path="/" component={LandingPage} isAccess={null} />
        <CustomRoute exact path="/login" component={LoginPage} isAuth={false} />
        <CustomRoute
          exact
          path="/register"
          component={RegisterPage}
          isAuth={false}
        />
      </Switch>
    </Router>
  );
}

export default App;
