import React, { Component } from 'react';
import Input from '../Components/UI/Input/Input';
import {Button} from 'react-bootstrap';
import classes from './Auth.css';
import Radium from 'radium';

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
          }
        }        
    }
    componentWillMount(){
        console.log('classes', classes.Auth);
    }
    checkValidity(value, rules) {
        let isValid = true;
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
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

    render(){
      const formElementsArray = [];
      for (let key in this.state.controls){
        formElementsArray.push({
          id: key,
          config: this.state.controls[key]
        })
      }
      const form = formElementsArray.map(formElement => {return(
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
      )});
      const array = ['red', 'bold'].join(' ');
      return(
          <div className={classes.Auth}>
            <form>
              {form}
             <Button bsStyle='success'>SUBMIT</Button>   
             <p className={array}>test words</p>
            </form>
          </div>
        );
    }
}

export default Radium(Auth);