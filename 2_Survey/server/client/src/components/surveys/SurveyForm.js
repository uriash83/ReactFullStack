import React , { Component } from 'react'
import {reduxForm , Field} from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields'



class SurveyForm extends Component{

    renderFields(){// zamiast 4 takich samych komponentów można zrobic tak:
        return _.map(formFields,field => {
            return <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name}/>
        })
    }    
    render(){

        return(
            <div>
                <form 
                    onSubmit={this.props.handleSubmit(
                                              //console.log(value))
                        this.props.onSurveySubmit
                    )} //handleSubmit jest dodawanty automatycznie z reduxForm
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button className="teal btn-flat right white-text" type='submit'>
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
                
            </div>
        );
    }
};

function validate(values){ // all values which come from form
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({name})=> {
        if(!values[name]){
            errors[name]='You must provide a value'
        }
    }) 

    
    /*
    if(!values.title){
        errors.title = "You must provide title"
    }
    if(!values.title){
        errors.title = "You must provide title"
    }
    .
    .
    .
    .
    */
    return errors;

}

export default reduxForm({
    validate: validate,
    form: "surveyForm",
    destroyOnUnmount: false // zeby nie czyściło pól jak wciściemy Back  w review
})(SurveyForm);