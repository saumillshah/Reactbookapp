import React, {Component} from 'react';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import axios from 'axios';

class Delete extends Component{
    constructor(props){

        super(props);
        this.state = {
            dID : "",
            authFlag : false,
            bookFlag : false}
            this.dIDHandler = this.dIDHandler.bind(this);
    }
    dIDHandler = (e) => {
        this.setState({
            dID : e.target.value
        })
    }

    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();   
        const data = {
            dID : this.state.dID,
        }
    
    axios.post('http://localhost:3001/delete',data)
  .then((response) => {
    console.log(response.data);
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
        let { bookFlag } = this.state;
        let authredirectVar = null;
        let redirectVar = null;
        let AuthBook;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
   }
   if(authFlag){
    console.log(authFlag)
    authredirectVar = <Redirect to ="/home"/>
}


if(bookFlag){
    AuthBook = <div><span className="myClass" style={{color:"red"}}> Book ID you have entered is already in the list, it should be unique </span></div>
}
 
        return(
            <div>{redirectVar}
           
            <div class="container">
            {authredirectVar}
                <div style={{width: "50%",float: "left"}} class="form-group">
                    <input onChange = {this.dIDHandler} type="text" class="form-control" name="dID" placeholder="Search a Book by Book ID"/>
                </div>
                <div style={{width: "50%", float: "right"}}>
                        <button class="btn btn-success" onClick = {this.submitLogin} type="submit">Delete</button>
                </div> 
            {AuthBook}
        </div>
            </div>
           
        )
    }
}

export default Delete;