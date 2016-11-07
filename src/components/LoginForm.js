import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Tekstikentta, Button, Spinner } from './common';

class LoginForm extends Component {
	
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;

		this.props.loginUser({ email, password });
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}
		return (
			<Button Painallus={this.onButtonPress.bind(this)}>
			Login
			</Button>
		);
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Tekstikentta
					label="Email"
					placeholder="email@gmail.com"
					onChangeText={this.onEmailChange.bind(this)}
					value={this.props.email}
					/>
				</CardSection>

				<CardSection>
					<Tekstikentta
					secureTextEntry
					label="Password"
					placeholder="password"
					onChangeText={this.onPasswordChange.bind(this)}
					value={this.props.password}
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>
					{this.props.error}
				</Text>

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};


// email state.auth.email osa auth viittaa reducers/index.js fileen ja email AuthReducers fileen
const mapStateToProps = ({ auth }) => {
// voisi refaktoroida niin että yläpuolella oleva state -> ({ auth })	
// ja returnin päälle luodaan. const { email, password, error } = auth;
// silloin returnit lyhenee

//	return {
//		email: state.auth.email,
//		password: state.auth.password,
//		error: state.auth.error,
//		loading: state.auth.loading
//	};
	const { email, password, error, loading } = auth;

	return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
