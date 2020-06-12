import React from 'react'
import {
  View, Text, StyleSheet, Image, Dimensions, KeyboardAvoidingView, Platform
} from 'react-native'

import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'

const { width } = Dimensions.get('window')

class Auth extends React.Component {
  state = {
    showSignUp: false,
    formType: 'showSignIn'
  }

  toggleAuthType = formType => {
    this.setState({ formType })
  }

  render() {
    const showSignIn = this.state.formType === 'showSignIn'
    const showSignUp = this.state.formType === 'showSignUp'
    const showForgotPassword = this.state.formType === 'showForgotPassword'
    return (
      <KeyboardAvoidingView
      style={styles.container}
        behavior={Platform.Os == "ios" ? "padding" : "height"}
      >
          <Image
            style={styles.logo}
            resizeMode='contain'
            source={require("../../assets/amplify.png")}
          />
          <Text style={styles.title}>Plant Doctor</Text>
          <Text style={styles.subtitle}>React Native Auth Amplify</Text>
          { showSignIn && (
            <SignIn
              toggleAuthType={this.toggleAuthType}
              updateView={() => this.props.updateView('main')}
            />
          ) }
          { showSignUp && <SignUp toggleAuthType={this.toggleAuthType} /> }
          { showForgotPassword && <ForgotPassword toggleAuthType={this.toggleAuthType} /> }

          <View style={{ position:'relative', bottom: -15 }}>
            {
              showSignUp || showForgotPassword ? (
                <Text style={styles.bottomMessage}>Already signed up? <Text
                style={styles.bottomMessageHighlight}
                onPress={() => this.toggleAuthType('showSignIn')}>&nbsp;&nbsp;Sign In</Text></Text>
              ) : (
                <Text style={styles.bottomMessage}>Need an account?
                  <Text
                    onPress={() => this.toggleAuthType('showSignUp')}
                    style={styles.bottomMessageHighlight}>&nbsp;&nbsp;Sign Up</Text>
                </Text>
              )
            }
          </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },  
  logo: {
    height: width / 2.5
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    fontFamily: 'sans-serif-condensed',
    color: '#e19f51'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'sans-serif',
  },
  bottomMessage: {
    fontFamily: 'sans-serif',
    fontSize: 18
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    paddingLeft: 10
  }
})

export default Auth