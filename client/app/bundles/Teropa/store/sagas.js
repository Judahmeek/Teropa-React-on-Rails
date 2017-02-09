import actionTypes from '../constants/actionTypes';
import * as actionCreators from '../actions/actionCreators';
import requestManager from '../../../libs/requestManager';
import { call, put, fork, takeEvery } from 'redux-saga/effects';

function* next(action) {
  try {
    const response = yield call(requestManager.submitEntity, action);
    yield put(actionCreators.setState(response.data));
  } catch (error) {
    console.log(`Failure in next saga: ${error}`);
  }
}

function* restart(action) {
  try {
    const response = yield call(requestManager.submitEntity, action);
    yield put(actionCreators.setState(response.data));
  } catch (error) {
    console.log(`Failure in restart saga: ${error}`);
  }
}

function* vote(action) {
  try {
    yield put(action);
    const response = yield call(requestManager.submitEntity, action);
    yield put(actionCreators.setState(response.data));
  } catch (error) {
    console.log(`Failure in vote saga: ${error}`);
  }
}

export function* nextSaga() {
  yield takeEvery(actionTypes.NEXT, next);
}

export function* restartSaga() {
  yield takeEvery(actionTypes.RESTART, restart);
}

export function* voteSaga() {
  yield takeEvery(actionTypes.VOTE, vote);
}

export default function* root() {
  yield fork(nextSaga);
  yield fork(restartSaga);
  yield fork(voteSaga);
}
