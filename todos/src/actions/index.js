import axios from 'axios';

import { FETCH_TODOS, POST_TODO, EDIT_TODO } from './types';

const url = 'https://jsonplaceholder.typicode.com/todos'

// RESTful get
export const fetchTodos = () => async dispatch => {

    const res = await axios.get(url);

    dispatch({ type: FETCH_TODOS, payload: res.data });

};

// RESTful post
export const postTodo = (todo) => async dispatch => {

    const res = await axios.post(url, todo);

    dispatch({ type: POST_TODO, payload: res.data });

};

// RESTful put
export const editTodo = (todo, id) => async dispatch => {

    const res = await axios.put(`${url}/${id}`, todo);

    dispatch({ type: EDIT_TODO, payload: res.data });

};