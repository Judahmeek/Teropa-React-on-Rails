/* eslint-disable no-console */
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import actionTypes from '../constants/actionTypes';
import * as actionCreators from '../actions/actionCreators';
import requestManager from '../../../libs/requestManager';

export function* next(action) {
  try {
    const response = yield call(requestManager.submitEntity, action);
    yield put(actionCreators.setState(response.data));
  } catch (error) {
    console.log(`Failure in next saga: ${error}`);
  }
}

export function* restart(action) {
  try {
    const response = yield call(requestManager.submitEntity, action);
    yield put(actionCreators.setState(response.data));
  } catch (error) {
    console.log(`Failure in restart saga: ${error}`);
  }
}

export function* vote(action) {
  try {
    const response = yield call(requestManager.submitEntity, action);
    yield put(actionCreators.setState(response.data));
  } catch (error) {
    console.log(`Failure in vote saga: ${error}`);
  }
}

function* nextSaga() {
  yield takeEvery(actionTypes.NEXT, next);
}

function* restartSaga() {
  yield takeEvery(actionTypes.RESTART, restart);
}

function* voteSaga() {
  yield takeEvery(actionTypes.VOTE, vote);
}

export default function* root() {
  yield fork(nextSaga);
  yield fork(restartSaga);
  yield fork(voteSaga);
}
