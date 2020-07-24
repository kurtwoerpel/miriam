import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  RouteComponentProps,
  useParams
} from "react-router-dom";
import './App.css';
import {Home,Past,Happening,Navigation,Mainmenu} from './components'
const NoMatchPage = () => {
  return (
    <div>
      <Navigation></Navigation>
      <Mainmenu></Mainmenu>
      <h3 className='oops-message text-large'>Woops! This page does not exist. Maybe try going <a href='/'>Home</a>?</h3>
    </div>
  );
};
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        err : null,
        isLoaded : false,
        records: [],
        info:[]
    };
  }
  componentDidMount() {
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/exhibitions_and_events?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
        .then(res => res.json())
        .then(res => {
          console.log(res.records)
          this.setState({ records: res.records })
        })
        .catch(error => console.log(error))

  }


render() {
  const { records,info } = this.state;
  console.log(this.props)
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home info={info} records={records}/>
        </Route>
        <Route exact path="/past">
          <Past info={info} records={records}/>
        </Route>
        <Route exact path="/happening/:id">
          <Happening info={info} records={records}/>
        </Route>
        <Route component={NoMatchPage} />
      </Switch>
    </div>
    </Router>
  );
}

}

export default App;
