import { Redirect, Route, Switch } from "react-router-dom"
import './App.css';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import AnalyticsPage from './pages/analytics';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <h2>TODO: Login with Shibboleth</h2>
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/analytics">
          <AnalyticsPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
