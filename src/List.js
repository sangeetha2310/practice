import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { formService } from './service/action';

class TableList extends Component {
    state = {
        firstName: '',
        lastName: '',
        country: '',
        subject: '',
        errors: {
            email: '',
            password: ''
        },
        emailValid: false,
        passwordValid: false,
        formValid: false,
        listArray: []
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value }
            // ,
            // () => { this.validateField(name, value) }

        )
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.errors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            errors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }




    render() {
        console.log("render", this.props.formData)
        const { firstName,
            lastName,
            country,
            subject, formValid, errors } = this.state;
        return (
            <div className="container">

                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Country</th>
                        <th>Subject</th>
                        <th>View</th>
                        <th>Delete</th>
                    </tr>
                    {this.props.formData.map((item, i) => {
                        return (<tr key={i}>

                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.country}</td>
                            <td>{item.subject}</td>
                            <td><button onClick={()=>this.view(item)}>view</button></td>
                            {/* <td><button onClick={()=>{
                                slice(item)
                            }}>delete</button></td> */}

                        </tr>)

                    }


                    )}

                </table>

            </div>
        );
    }
}
const mapStateToProps = state => ({
    formData: state.reducer.formData
})
const mapDispatchToProps = dispatch => ({
    formService: payLoad => dispatch(formService(payLoad))
})
export default connect(mapStateToProps, mapDispatchToProps)(TableList);
