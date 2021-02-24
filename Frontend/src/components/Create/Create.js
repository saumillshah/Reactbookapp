import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';

class Create extends Component{

    constructor(props){

        super(props);
        this.state = {
            bID : "",
            bName : "",
            aName : "",
            authFlag : false,
            bookFlag : false
        }
       
        this.bIDHandler = this.bIDHandler.bind(this);
        this.bNameHandler = this.bNameHandler.bind(this);
        this.aNameHandler = this.aNameHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
       }

       bIDHandler = (e) => {
        this.setState({
            bID : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    bNameHandler = (e) => {
        this.setState({
            bName : e.target.value
        })
    }
    aNameHandler = (e) => {
        this.setState({
            aName : e.target.value
        })
    }
        submitLogin = (e) => {
            var headers = new Headers();
            //prevent page from refresh
            e.preventDefault();   
            const data = {
                bID : this.state.bID,
                bName : this.state.bName,
                aName : this.state.aName,
            } 
            console.log(data)
        axios.post('http://localhost:3001/create',data)
  .then((response) => {
    console.log(response.data);
    console.log(response.status);
    if(response.data === 's'){
    this.setState({
        authFlag : false,
        bookFlag : true
        })
    }else{
        console.log("authflag else")
      
            this.setState({
            
                authFlag : true,
                bookFlag : false
        })
    }
    })}
    render(){
        let { authFlag } = this.state;
        let redirectVar = null;
        let authredirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
   }
        if(authFlag){
            console.log(authFlag)
            authredirectVar = <Redirect to ="/home"/>
        }
        
        let AuthBook;
        let { bookFlag } = this.state;
        if(bookFlag){
            AuthBook = <div><span className="myClass" style={{color:"red"}}> Book ID you have entered is already in the list, it should be unique </span></div>
        }
        return(
            <div>
            {redirectVar}
            {authredirectVar}
                <br/>
                <div class="container">
                    
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.bIDHandler} type="text" class="form-control" name="bID" placeholder="Book ID" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.bNameHandler} type="text" class="form-control" name="bName" placeholder="Book Title" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.aNameHandler}  type="text" class="form-control" name="aName" placeholder="Book Author" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button class="btn btn-success" onClick = {this.submitLogin} >Create</button>
                        </div> 
                        {AuthBook}
                   
                </div>
            </div>
        )
        
    }
}

export default Create;