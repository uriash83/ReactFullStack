import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import formFields from './formFields'
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';  
// komponenty Review oraz SurveNew nie mają swoich route , więc stosujemy withRouter

const SurveyReview = ({ onCancel,formValues , submitSurvey ,history}) => { //formValues z mapStateToProps

    const reviewFields = _.map(formFields,field => {
        return(
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>

            </div>
        );
    });
    return(
        <div>
            <h5>Please confirm form</h5>
            {reviewFields}   
            <button
                className="yellow white-text btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button 
                onClick={() => {submitSurvey(formValues,history)}}
                className="green darken-3 btn-flat right white-text"
            >
                Send
                <i className="material-icon right">email</i>
            </button>
        </div>
    );
};

function mapSteteToProps (state){
    console.log(state)
    return{
        formValues: state.form.surveyForm.values
    }
}

export default connect(mapSteteToProps,actions)(withRouter(SurveyReview));