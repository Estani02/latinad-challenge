import {takeEvery, call, put} from 'redux-saga/effects';

// Simula un fetch a una API
const fetchDataFromApi = async () => {
  const response = await fetch('/api/data');

  if (!response.ok) throw new Error('Failed to fetch data');

  return response.json();
};

function* fetchDataSaga(): Generator<unknown, void, unknown> {
  try {
    const data = yield call(fetchDataFromApi);

    yield put({type: 'mySlice/fetchDataSuccess', payload: data});
  } catch (error) {
    if (error instanceof Error) {
      yield put({type: 'mySlice/fetchDataFailure', payload: error.message});
    } else {
      yield put({type: 'mySlice/fetchDataFailure', payload: 'Unknown error'});
    }
  }
}

// Escucha la acción para iniciar la saga
export function* mySaga() {
  yield takeEvery('mySlice/fetchDataRequest', fetchDataSaga);
}
