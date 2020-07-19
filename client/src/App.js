import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { checkAuth } from "./hoc/auth";

// base components
import NavBar from "./components/base/Navbar";
import PageHeader from "./components/base/PageHeader";
import PageFooter from "./components/base/PageFooter";

// pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VideoUploadPage from "./pages/video/VideoUploadPage";
import NoMatchPage from "./pages/error/NoMatchPage";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <NavBar collapsed={collapsed} />
        <Layout
          style={{
            minHeight: "100vh",
            marginLeft: collapsed ? 80 : 200,
            transition: "all 0.2s",
            msTransition: "all, 0.2s",
            MozTransition: "all 0.2s",
            WebkitTransition: "all 0.2s",
          }}
        >
          <PageHeader
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
          />
          <Switch>
            <Route exact path="/" component={checkAuth(LandingPage, null)} />
            <Route
              exact
              path="/login"
              component={checkAuth(LoginPage, false)}
            />
            <Route
              exact
              path="/register"
              component={checkAuth(RegisterPage, false)}
            />
            <Route
              exact
              path="/video/upload"
              component={checkAuth(VideoUploadPage, true)}
            />
            <Route component={NoMatchPage} />
          </Switch>
          <PageFooter />
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
