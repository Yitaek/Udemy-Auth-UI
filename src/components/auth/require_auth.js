import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class Authentication extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			if (!this.props.authenticated) {
				this.context.router.push('/')
			}
		}

		componentWillUpdate(nextProps) {
			// for when the user signs out
			if (!nextProps.authenticated) {
				this.context.router.push('/')
			}
		}

		render() {

			return <ComposedComponent {...this.props} />
		}
	}

	function mapStateToProps(state) {
		return {authenticated: state.auth.authenticated };
	}

	return connect(mapStateToProps)(Authentication);
}

// in some other file, use this HOC

// import Authentication - my HOC
// import Resources - this is the component I want to wrap 

// To make use of it, it's straight forward

// const COmposedCOmponent = AUthentication(Resources);

// in some render method... <ComposedComponet /> 