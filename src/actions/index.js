import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }){
	// redux thunk allows you to return a function instead of object
	// function gives access to dispatch method 
	return function(dispatch) {
		// Submit email/password to the server
		axios.post(`${ROOT_URL}/signin`, { email, password })

		// If request is good...
		// - update state to indicate user is authenticated
		// - save the JWT token 
		// - redirect ot the route '/feature'

		// If request is bad...
		// - show an error to the user 
	}
	
}