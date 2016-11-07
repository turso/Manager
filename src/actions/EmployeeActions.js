import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	EMPLOYEES_FETCH_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop, value }
	};
};

// users/uid/employess on json polku
export const employeeCreate = ({ name, phone, shift }) => {
	const { currentUser } = firebase.auth();

	// return tehty sitä varten ettei action palauta mitään (REDUX THUNK kikka)
	return (dispatch) => {
	firebase.database().ref(`/users/${currentUser.uid}/employees`)
		.push({ name, phone, shift })
		// tehdään dispatch lisäys sitä varten, että formi
		// tyhjentyy kun käyttäjä on lisätty sinne
		.then(() => {
			dispatch({ type: EMPLOYEE_CREATE });
			Actions.employeeList({ type: 'reset' });
		});
	};
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
