import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./pages/Layout";
import ProtectedRoute from './route/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" component={ProductList} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/checkout" component={Checkout} />
          </Switch>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
