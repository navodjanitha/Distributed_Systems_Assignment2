import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import TrainList from './trainList';
import MobilePayment from'./mobilePayment';
import AllRoutes from'./allRoutes';
import { breakStatement } from "@babel/types";

class Login extends Component{
constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state={
        name: '',
        totalPrice:'',
        email: '',
        password: ''
    }

}


onChangeEmail(e){
    this.setState({
        email: e.target.email
    });
}

onChangePassword(e){
    this.setState({
        password: e.target.password
    });
}

        myFunc = function(e){
            const email = this.state.email;
            const password = this.state.password;

            //validation for the fields
            if(this.state.email == '' && this.state.password == ''){
                alert('Please enter the email and password');
                breakStatement(this);
            }
            if (this.state.email == '') {
                alert('Please enter your email');
                breakStatement(this);
            }
            if (this.state.password == ''){
                alert('Please enter the password');
                breakStatement(this);
            }
            else{
                        // If the user identify correctly, navigate to the home page
                        ReactDOM.render(<AllRoutes  name={this.state.name} />, document.getElementById('root'));

            }

        }




    render() {
        var tot = 0;
        return(


            <div className="container">
                <div className="backimg">
                    <div className="paddinglog">

                    </div>
                    <div className="row">
                        <div className="col-md-7">
                            <form className="paddingsub">
                                <fieldset>
                                    <legend>Online Food Shopping</legend>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input className="form-control"
                                               id="exampleInputEmail1"
                                               aria-describedby="emailHelp"
                                               placeholder="Enter email"
                                               type="email"
                                               ref="email"
                                               value={this.state.email}
                                               onChange={this.onChangeEmail}/></div>

                                    <div className="form-group"><label htmlFor="exampleInputPassword1">Password</label>
                                        <input className="form-control"
                                               id="exampleInputPassword1"
                                               placeholder="Password"
                                               type="password"
                                               ref="password"
                                               value={this.state.password}
                                               onChange={this.onChangePassword}/></div>

                                    <button type="submit" className="btn btn-primary"
                                            onClick={() => this.myFunc(tot)}>Sign in</button>
                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
