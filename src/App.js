import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Sidenav } from './components/Sidenav'
import { Events } from './pages/Events'
import { Stats } from './pages/Stats'
import { DataTable } from './pages/DataTable';

const styles = {
  display: 'flex',
}

function App() {
  return (
    <div className="App" style={styles}>

      <Router >
        <Sidenav />
        <Switch>
          <Route path="/events">
            <Events />
          </Route>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="/datatable">
            <DataTable />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
