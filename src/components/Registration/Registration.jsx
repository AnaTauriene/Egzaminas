import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import './Registration.css';
import { withRouter } from 'react-router-dom';

class Registration extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      surname: "", 
      alcohol:"",
      milk:"",
      nuts:"",   
      formErrors: {
        name:"",
        surname:"",
      },
    };
  }
  
  render() {
    const { name, surname, alcohol, milk, nuts, formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper-reg">
          <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
            <div className="name" id="boxes"> 
              <FormLabel>Vardas</FormLabel>
              <FormControl 
                  type="text" 
                  name="name"
                  value={name}
                  placeholder="Įveskite vardą"
                  onChange={this.handleChange}
              />  
              {formErrors.name.length > 0 && (
                  <span className="errorMessage">{formErrors.name}</span>
              )}                         
            </div>
            <br/>
            <div className="surname" id="boxes"> 
              <FormLabel>Pavardė</FormLabel>
              <FormControl 
                  type="text" 
                  name="surname"
                  placeholder="Įveskite pavardę"
                  value={surname}
                  onChange={this.handleChange}                  
              />
              {formErrors.surname.length > 0 && (
                  <span className="errorMessage">{formErrors.surname}</span>
              )}                                   
            </div>
            <br/>
            <div className="alcohol" id="boxes"> 
              <FormLabel>Vartoja alkoholį</FormLabel>
              <FormControl 
                  type="checkbox" 
                  name="alcohol"                 
                  value={alcohol}
                  onChange={this.handleChange}                  
              />                                 
            </div>
            <br/>
            <div className="milk" id="boxes"> 
              <FormLabel>Alergiškas pieno produktams</FormLabel>
              <FormControl 
                  type="checkbox" 
                  name="milk"                 
                  value={milk}
                  onChange={this.handleChange}                  
              />                                  
            </div>
            <br/>
            <div className="nuts" id="boxes"> 
              <FormLabel>Alergiškas riešutams</FormLabel>
              <FormControl 
                  type="checkbox" 
                  name="nuts"                 
                  value={nuts}
                  onChange={this.handleChange}                  
              />                                 
            </div>
            <div className="register" id="boxes">
              <Button variant="primary" type="submit" onClick={() =>this.nextPath(`/clientinfo`)}>
                  Registruoti
              </Button>
            </div> 
          </Form>
        </div>
      </div>      
    );
  }
  nextPath = (path)=>{
    this.props.history.push(path);
  }

  //POST data of new user
  fetchData = async () => {
    const res = await fetch("http://localhost:8086/users", { 
      method: "POST",
      headers: {
        "content-type": "Application/json",   
      },
      body: JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        position: this.state.position,
        password: this.state.password
      })
    });
    const statusCode = await res.status;
    return statusCode;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    this.setState({
      [name]: value,
      formErrors, 
        [name]: value 
    });
    switch (name) {
      case "name":
      formErrors.name = /^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/.test(value)
          ? ""
          : "Galima naudoti tik raides";
      break;
      case "surname":
      formErrors.surname = /^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/.test(value)
          ? ""
          : "Galima naudoti tik raides";
      break;
      default:
      break;
    }
  }; 

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.formValidation()) {
      const answerfrombackend = await this.fetchData();
      this.evalRes(answerfrombackend);
    }
  }

  formValidation = () => {
    const { name, surname } = this.state;
    return (this.formValidEmptyFields(this.state) && 
              this.allLetter(name, surname)        
            )
  }

  evalRes(statusCode){
    statusCode ===  201
    ? alert("Registracija pavyko") && this.nextPath(`/`)
    : alert("Registracija nepavyko, bandykite vėliau dar kartą")
  }

  formValidEmptyFields = (e) => {
    const { name, surname } = this.state;
    if(name.length&&surname.length !== 0){
      return true;
    }else{
      alert("Visi laukai turi būti užpildyti");
      return false;
    }
  }

  //Validation of name and surname
  allLetter = (name, surname) => { 
    if ((/^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/.test(name)) && (/^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/.test(surname))) {
      return true;
    } else {
      alert('Galima naudoti tik raides');
      return false;
    }
  }
}

export default withRouter(Registration);
