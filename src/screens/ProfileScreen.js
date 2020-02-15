import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {connect} from 'react-redux';
import {signUpUser, signInUser} from '../redux/actions/ProfileAction';
import {TextField} from 'react-native-material-textfield';
import {FormValidationMessage} from 'react-native-elements';
import SignUp from '../components/profile/signUp.js';
import LogIn from '../components/profile/logIn.js';
import {showMessage} from 'react-native-flash-message';
class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.onFocus = this.onFocus.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
  }

  onFocus() {
    let {errors = {}} = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onSubmitEmail() {
    this.password.focus();
  }

  enableSubmit = () => {
    let errors = {};
    const {email, password} = this.state;
    if (email == '' && password == '') {
      errors.email = 'Should not be empty';
      errors.password = 'Should not be empty';
    } else {
      if (email == '') {
        errors.email = 'Should not be empty';
      } else if (password == '') {
        errors.password = 'Should not be empty';
      } else {
        if (email) {
          const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (reg.test(email) === false) {
            errors.email = 'Not a valid email';
          } else {
            this.signIn();
          }
        }
        // return true;
      }
    }
    this.setState({errors});
  };

  signIn(data) {
    this.props.signInUser(data);
  }

  signUp(data) {
    this.props.signUpUser(data);
  }

  navigateToSignUp() {
    this.props.signUpUser(null);
  }

  render() {
    //signUpUser

    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 15,
          paddingHorizontal: 25,
          paddingBottom: 100,
        }}>
        {!this.props.signedUserData && (
          <SignUp signUpUser={this.signUp.bind(this)} />
        )}

        {this.props.signedUserData &&
          this.props.signedUserData.loggedIn == false && (
            <LogIn
              signedUserData={this.props.signedUserData}
              signInUser={this.signIn.bind(this)}
              navigateToSignUp={this.navigateToSignUp.bind(this)}
            />
          )}

        {this.props.signedUserData &&
          this.props.signedUserData.loggedIn == true && (
            <View
              style={{paddingVertical: 15, flex: 1, justifyContent: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 33,
                    color: '#00C07F',
                    // lineHeight: 15,
                    marginLeft: 5,
                  }}>
                  {'Hello ' + this.props.signedUserData.firstName}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  backgroundColor: '#00a699',
                  padding: 20,
                  borderRadius: 4,
                  marginTop: 20,
                }}
                onPress={() => this.signIn(false)}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    signUpUser: data => dispatch(signUpUser(data)),
    signInUser: data => dispatch(signInUser(data)),
  };
}

const mapStateToProps = state => {
  return {
    signedUserData: state.auth.signedUpUser,
  };
};

export default connect(
  mapStateToProps,
  bindActions,
)(HomeScreen);
