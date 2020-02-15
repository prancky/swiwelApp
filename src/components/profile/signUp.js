import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {FormValidationMessage} from 'react-native-elements';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
      submitState: false,
      errors: {},
    };

    this.onFocus = this.onFocus.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.firstNameRef = this.updateRef.bind(this, 'firstName');
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

  enableSubmit = () => {
    let errors = {};
    const {email, password, firstName, confirmPassword} = this.state;
    if (
      email == '' &&
      password == '' &&
      firstName == '' &&
      confirmPassword == ''
    ) {
      errors.email = 'Should not be empty';
      errors.password = 'Should not be empty';
      errors.firstName = 'Should not be empty';
      errors.confirmPassword = 'Should not be empty';
    } else {
      if (firstName == '') {
        errors.firstName = 'Should not be empty';
        return false;
      } else if (email == '') {
        errors.email = 'Should not be empty';
      } else if (password == '') {
        errors.password = 'Should not be empty';
      } else if (confirmPassword == '') {
        errors.confirmPassword = 'Should not be empty';
      } else {
        if (email) {
          const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (reg.test(email) === false) {
            errors.email = 'Not a valid email';
          } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Password did not match';
          } else {
            this.signUp();
          }
        }
        // return true;
      }
    }
    this.setState({errors});
  };

  signUp() {
    let data = {
      loggedIn: false,
      email: this.state.email,
      firstName: this.state.firstName,
      password: this.state.password,
    };

    this.props.signUpUser(data);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 15,
          paddingHorizontal: 25,
          paddingBottom: 100,
        }}>
        <View style={{paddingVertical: 15}}>
          <TextField
            labelTextStyle={{
              fontWeight: '400',
            }}
            labelFontSize={16}
            fontSize={18}
            ref={this.firstNameRef}
            value={this.state.firstName}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={firstName => this.setState({firstName})}
            returnKeyType="next"
            label="Name"
            textColor="#000"
            baseColor="#000"
            tintColor="#000"
            error={this.state.errors.firstName}
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
            ref={this.emailRef}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={email => this.setState({email})}
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
          <TextField
            labelTextStyle={{
              fontWeight: '400',
            }}
            labelFontSize={16}
            fontSize={18}
            // ref={this.passwordRef}
            value={this.state.confirmPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            clearTextOnFocus={Platform.OS != 'ios' ? false : true}
            onFocus={this.onFocus}
            onChangeText={password =>
              this.setState({confirmPassword: password})
            }
            textColor="#000"
            baseColor="#000"
            tintColor="#000"
            blurOnSubmit={true}
            returnKeyType="done"
            label="Password Confermation"
            error={this.state.errors.confirmPassword}
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
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
