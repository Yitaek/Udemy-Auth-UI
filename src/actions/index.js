import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER,
	AUTH_ERROR,
	UNAUTH_USER,
	FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';

// using redux thunk to get back a function 

export function signinUser({ email, password }){
	// redux thunk allows you to return a function instead of object
	// function gives access to dispatch method 
	return function(dispatch) {
		// Submit email/password to the server
		axios.post(`${ROOT_URL}/signin`, { email, password })
			.then(response => {
				// If request is good...
				// - update state to indicate user is authenticated
				dispatch({ type: AUTH_USER });
				// - save the JWT token 
				localStorage.setItem('token', response.data.token);
				// - redirect ot the route '/feature'
				browserHistory.push('/feature');

			})
			.catch(() => {
				// If request is bad...
				// - show an error to the user 
				dispatch(authError('Bad Login Info'));
			});

		// axios always returns a promise
	}
}

export function signupUser({ email, password }){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signup`, { email, password })
			.then(response => {
				dispatch({ type: AUTH_USER });
				console.log(response)
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/feature');
			})
			.catch((err) => {
				//console.log(JSON.stringify(err.response))
				dispatch(authError(err.response.data.error))
			});
	}
}

export function signoutUser(){
	// delete the JWT token
	localStorage.removeItem('token');
	
	return {
		type: UNAUTH_USER
	};
}

export function authError(error){
	return {
		type: AUTH_ERROR, 
		payload: error
	}
}

export function fetchMessage(){
	return function(dispatch){
		axios.get(ROOT_URL, {
			headers: { authorization: localStorage.getItem('token')}
		})
		.then(response => {
			dispatch({
				type: FETCH_MESSAGE,
				payload: response.data.message
			});
		})
	}
}