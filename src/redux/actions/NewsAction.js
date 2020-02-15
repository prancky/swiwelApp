import {API_URL, API_KEY} from '../../config/connection';

export const fetchNewsList = country => async dispatch => {
  return fetch(
    API_URL + 'v2/top-headlines?country=' + country + '&apiKey=' + API_KEY,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  )
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: 'NEWS_ACTION',
        payload: response,
      });
    })
    .catch(e => {
      console.log('server error', e);
    });
};

export const fetchCustomNewsList = para => async dispatch => {
  return fetch(API_URL + 'v2/everything?q=' + para + '&apiKey=' + API_KEY, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: 'CUSTOM_NEWS_ACTION',
        payload: response,
      });
    })
    .catch(e => {
      console.log('server error', e);
    });
};
