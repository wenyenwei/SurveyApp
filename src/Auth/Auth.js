import React, { Component } from 'react';
import Input from '../Components/UI/Input/Input';
import {Button} from 'react-bootstrap';
import classes from './Auth.css';
import { connect } from 'react-redux';
import Spinner from '../Components/UI/Spinner/Spinner';
import * as actions from '../store/actions/index';


class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
          controls:{
            email: {
              elementType: 'input',
              elementConfig: {
                type: 'email',
                placeholder: 'example@mail.com'
              },
              value: '',
              validation: {
                required: true,
                isEmail: true
              },
              valid: false,
              touched: false
            },
            password: {
              elementType: 'input',
              elementConfig: {
                type: 'password',
                placeholder: 'Enter password'
              },
              value: '',
              validation: {
                required: true,
                minLength: 6
              },
              valid: false,
              touched: false
            }
          },
          isSignup: true
        }        
    }
    
    switchAuthModeHandler = () => {
      this.setState(prevState => {
        return {isSignup: !prevState.isSignup}
      });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules){
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        
        if (rules.isEmail){
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    
    inputChangeHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updateControls});
    }
    
    submitHandler = (event) => {
      event.preventDefault();
      console.log(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    render(){
      const formElementsArray = [];
      for (let key in this.state.controls){
        formElementsArray.push({
          id: key,
          config: this.state.controls[key]
        })
      }
      let form = formElementsArray.map(formElement => {
        return(
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangeHandler(event, formElement.id)}
        />
      );
        if (this.props.loading){
          form = <Spinner />
        }
      });
        
        let errorMessage = null;
        
        if (this.props.error){
          return errorMessage = (
            <p>{this.props.error.message}</p>
          )
        }      
      
      return(
          <div className={classes.Auth}>
            {errorMessage}
            <form>
              {form}
             <Button onClick={(e)=>this.submitHandler(e)} bsStyle='success'>SUBMIT</Button>   
            </form>
            <Button 
              onClick={this.switchAuthModeHandler}
              bsStyle='danger'
            >
              SWITCH TO {this.state.isSignup? 'SIGN IN':'SIGN UP'}
            </Button>
          </div>
        );
    }
}
const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);