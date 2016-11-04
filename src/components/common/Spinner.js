import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ koko }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={koko || 'large'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
