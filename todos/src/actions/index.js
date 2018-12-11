import axios from 'axios';

import { FETCH_TODOS, POST_TODO} from './types';

const url = 'https://jsonplaceholder.typicode.com/todos'

export const fetchTodos = () => async dispatch => {

    const res = await axios.get(url);

    dispatch({ type: FETCH_TODOS, payload: res.data });

};

export const postTodo = (todo) => async dispatch => {

    const res = await axios.post(url, todo);

    dispatch({ type: POST_TODO, payload: res.data });

};

export const editTodo = (todo, id) => async dispatch => {

	// console.log(id)

    const res = await axios.put(`${url}/${id}`, todo);

    console.log(res.data);

    dispatch({ type: POST_TODO, payload: res.data });

};