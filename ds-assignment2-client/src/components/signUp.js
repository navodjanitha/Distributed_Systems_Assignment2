import React,{Component} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";
import TrainList from "./trainList";
import Login from "./login";

class Signup extends Component {
    constructor(props) {
        super(props);
    }

    /* *This method is called wwhen the submit button in the signup page is clicked, this method used to register a new user if the * email addresse entered is not already in use */

    signup(){
        const uname = this.refs.uname.value;
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const cpassword = this.refs.cpassword.value;

        if(uname===''||email===''||password===''||cpassword===''){
            alert('One or more fields empty');
        }

        if(password !== cpassword){
            alert('Password is incorrect.Please enter again')
        }
        else {
            var foundEmail = false;

            fetch('http://localhost:4001/demo/getUser/' + email, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                return response.json();
            }).then(data => {
                var user = JSON.stringify(data);
                console.log(user);

                if (user != '[]') {
                    alert("Email is already in use");
                } else {
                    var data = {"email": email,"uname": uname,  "password": password};
                    console.log(data);
                    fetch('http://localhost:4001/demo/addUser', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {'Content-Type': 'application/json'}
                    }).then(response => {
                        return response.json();
                    }).then(data => {
                        alert('Successfully Sign Up');
                        ReactDOM.render(<Login/>, document.getElementById('root'));
                    }).catch(err => {
                        alert("Second" + err);
                    })
                }
            }).catch(err => {
                alert("First Err:" + err);
            })
        }

    }
render() {

        return(


            <div className="container">
                <div className="backimg">
                    <div className="paddinglog">
                    </div>

                    <div className="row">
                        <div className="col-md-7">
                            <form className="paddingsub">
                                <fieldset>
                                    <legend>Online Train Tickets Booking</legend>
                                    <h3>Sign Up</h3>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Username</label>
                                        <input className="form-control" id="exampleInputEmail1"
                                               aria-describedby="emailHelp" placeholder="Username" type="text"
                                               ref="uname"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" type="email" ref="email"/>
                                    </div>

                                    <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input className="form-control" id="exampleInputPassword1" placeholder="Password" type="password" ref="password"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                        <input className="form-control" id="exampleInputPassword1" placeholder="Password" type="password" ref="cpassword"/>
                                    </div>


                                    <button type="button" className="btn btn-primary" onClick={()=>{this.signup()}}>Submit</button>
                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        )
}

}

 export default Signup;
