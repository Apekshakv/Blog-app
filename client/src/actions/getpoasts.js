

import * as api from '../api/index';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchports(); 
    console.log(data);


    dispatch({ type: 'FETCH_ALL', payload: data }); 
  } catch (error) {
    console.error(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.error(error);
  }
};
