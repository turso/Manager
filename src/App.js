import React, { Component } from 'react';
// import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
	
	componentWillMount() {
		const config = {
			apiKey: 'AIzaSyDkw0e27D_s281IGp_-LWgkm6rOQ17JCrQ',
			authDomain: 'manager-4c60f.firebaseapp.com',
			databaseURL: 'https://manager-4c60f.firebaseio.com',
			storageBucket: 'manager-4c60f.appspot.com',
			messagingSenderId: '837631305241'
		};
		
		firebase.initializeApp(config);
	}


	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
