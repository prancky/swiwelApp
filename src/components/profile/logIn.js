import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {connect} from 'react-redux';
import {TextField} from 'react-native-material-textfield';
import {FormValidationMessage} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
export default class HomeScreen extends Component {
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

  signIn() {
    let data = {
      loggedIn: true,
      email: this.state.email,
      password: this.state.password,
    };
    let userData = this.props.signedUserData;
    if (
      userData &&
      userData.email == data.email &&
      userData.password == data.password
    ) {
      this.props.signInUser(true);
    } else {
      showMessage({
        message: 'Invalid login',
        type: 'danger',
      });
    }
  }

  render() {
    //signUpUser
    return (
      <View
        style={{
          // flex: 1,

          justifyContent: 'center',
          // alignItems: 'center',
          paddingVertical: 100,
          // paddingHorizontal: 25,
          paddingBottom: 100,
        }}>
        <View style={{paddingVertical: 15}}>
          <TextField
            labelTextStyle={{
              fontWeight: '400',
            }}
            labelFontSize={16}
            fontSize={18}
            ref={this.emailRef}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={email => this.setState({email})}
            onSubmitEditing={this.onSubmitEmail}
            returnKeyType="next"
            label="Email"
            textColor="#000"
            baseColor="#000"
            tintColor="#000"
            error={this.state.errors.email}
            activeLineWidth={1}
          />
        </View>

        <View style={{paddingVertical: 15}}>
          <TextField
            labelTextStyle={{
              fontWeight: '400',
            }}
            labelFontSize={16}
            fontSize={18}
            ref={this.passwordRef}
            value={this.state.password}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            clearTextOnFocus={Platform.OS != 'ios' ? false : true}
            onFocus={this.onFocus}
            onChangeText={password => this.setState({password: password})}
            textColor="#000"
            baseColor="#000"
            tintColor="#000"
            onSubmitEditing={() => {
              this.onSubmit();
            }}
            blurOnSubmit={true}
            returnKeyType="done"
            label="Password"
            error={this.state.errors.password}
            activeLineWidth={1}
          />
        </View>

        <View style={{paddingVertical: 15}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: '#00a699',
              padding: 20,
              borderRadius: 4,
              marginTop: 20,
            }}
            onPress={() => this.enableSubmit()}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingVertical: 15}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: '#00a699',
              padding: 20,
              borderRadius: 4,
              marginTop: 20,
            }}
            onPress={() => this.props.navigateToSignUp()}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
