import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import TopNav from './components/TopNav/TopNav';
import MainSearch from './pages/MainSearch/MainSearch';
import PeopleSearch from './pages/PeopleSearch/PeopleSearch';
import Feed from './pages/Feed/Feed';
import MyNetwork from './pages/MyNetwork/MyNetwork';
import Jobs from './pages/Jobs/Jobs';
import Profile from './pages/Profile/Profile';
import Connections from './pages/Connections/Connections';
// import NotFound from './pages/NotFound/NotFound';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <>
          <TopNav />
          <Route exact path="/search/all" component={MainSearch} />
          <Route exact path="/search/people" component={PeopleSearch} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/profile:id" component={Profile} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/mynetwork" component={MyNetwork} />
          <Route exact path="/connections" component={Connections} />
          {/* <Route component={NotFound} /> */}
        </>
      </Switch>
    </BrowserRouter>
  );
}
