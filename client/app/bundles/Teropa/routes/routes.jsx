import React from 'react';
import {Route} from 'react-router';
import Layout from '../layout/Layout';
import {VotingContainer} from '../containers/Voting';
import {ResultsContainer} from '../containers/Results';

export const routes = <Route component={Layout}>
  <Route path="/results" component={ResultsContainer} />
  <Route path="/" component={VotingContainer} />
</Route>;