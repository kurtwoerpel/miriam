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
import {Home,Past,Present,Future,Happening,Navigation,Homepreview, Mainmenu, AnnouncementPage, ExhibitionPage} from './components'
const NoMatchPage = () => {
  return (
    <div>
      <Navigation></Navigation>
      <Mainmenu></Mainmenu>
      <h3 className='oops-message text-large'>Woops! This page does not exist. Maybe try going <a className='link' href='/'>Home</a>?</h3>
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
        announcements: [],
        info:[],
        events: []
    };
  }
  componentDidMount() {
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/exhibitions?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
        .then(res => res.json())
        .then(res => {
          console.log(res.records)
          this.setState({ records: res.records })
        })
        .catch(error => console.log(error))
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/announcements?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
        .then(res => res.json())
        .then(res => {
          console.log(res.records)
          this.setState({ announcements: res.records })
        })
        .catch(error => console.log(error))
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/events?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
        .then(res => res.json())
        .then(res => {
          console.log(res.records)
          this.setState({ events: res.records })
        })
        .catch(error => console.log(error))
  }


render() {
  const { records,info, announcements, events } = this.state;
  records.forEach(function (element) {
  element.type = "exhibition";
});
  announcements.forEach(function (element) {
  element.type = "announcements";
});
  events.forEach(function (element) {
  element.type = "event";
});

  const everything = records.concat(announcements).concat(events).sort((a, b) => (a.fields.StartTime < b.fields.StartTime) ? 1 : -1)
   console.log(everything)
  console.log(records)
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home info={info} records={records}/>
        </Route>
        <Route exact path="/home-preview">
          <Homepreview info={info} records={records}/>
        </Route>
        <Route exact path="/past">
          <Past info={info} records={everything}/>
        </Route>
        <Route exact path="/current">
          <Present info={info} records={everything}/>
        </Route>
        <Route exact path="/upcoming">
          <Future info={info} records={everything}/>
        </Route>
        <Route exact path="/exhibition/:id">
          <ExhibitionPage info={info} records={records}/>
        </Route>
        <Route exact path="/event/:id">
          <Happening info={info} records={events}/>
        </Route>
        <Route exact path="/announcement/:id">
          <AnnouncementPage info={info} records={announcements}/>
        </Route>
        <Route component={NoMatchPage} />
      </Switch>
    </div>
    </Router>
  );
}

}

export default App;
