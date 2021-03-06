import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { submitEmailPasswordAuthentication } from './actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { password } = this.state;
    this.props.submitEmailPasswordAuthentication(email, password);
  }
  render() {
    return (
      <div data-test="component-login-form">
        <Form onSubmit={this.handleSubmit}>
          {this.props.loginForm.errors ?
            <Message negative data-test="login-errors">
              <Message.Header>Authentication Error</Message.Header>
              {this.props.loginForm.message}
            </Message>
          : null}
          <Form.Field>
            <Form.Input
              placeholder="Email"
              label="Email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              autoComplete="off"
              data-test="form-email"
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              placeholder="Password"
              label="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              data-test="form-password"
            />
          </Form.Field>
          <Form.Field>
            <Button
              primary
              fluid
              loading={this.props.loginForm.loading}
              disabled={this.props.loginForm.loading}
              data-test="form-btn-login"
            >
              Login
            </Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loginForm: PropTypes.shape({
    errors: PropTypes.bool,
    message: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  submitEmailPasswordAuthentication: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { loginForm } = state.auth;
  return {
    loginForm,
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    submitEmailPasswordAuthentication,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
