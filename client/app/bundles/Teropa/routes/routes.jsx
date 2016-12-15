import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../layout/Layout';
import {VotingContainer} from '../containers/Voting';
import {ResultsContainer} from '../containers/Results';

const routes = <Route path="/" component={Layout}>
  <IndexRoute component={VotingContainer} />
  <Route path="results" component={ResultsContainer} />
</Route>;

export default routes;