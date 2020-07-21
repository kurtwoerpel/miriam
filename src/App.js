import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
  useParams
} from "react-router-dom";
import './App.css';
import {Home} from './components'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        err : null,
        isLoaded : false,
    };
  }
render() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/">
                <Home/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

}

export default App;
