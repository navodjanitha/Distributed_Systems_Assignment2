import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';
import TrainList from "./components/trainList";
import CreateReservation from "./components/createTicketReservation";
import CardPayment from "./components/cardPayment";
import MobilePayment from "./components/mobilePayment";
import Signup from "./components/signUp";
import Login from "./components/login";

class App extends Component {

    constructor(props){
        super(props);

        this.state={
            name: this.props.name
        }
    }
  render() {
    return (
        <Router>
            <div className="container">
                <nav className="nav navbar-expand-lg navbar-light bg-success">

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">

                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Login</Link>
                            </li>

                            <li className="navbar-item">
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                            </li>


                        </ul>
                    </div>

                </nav>
                <Route path="/" exact component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/reserve/:id" component={CreateReservation}/>
                <Route path="/doCardPayment" component={CardPayment}/>
                <Route path="/doMobilePaymnt" component={MobilePayment}/>


            </div>
        </Router>
    );
  }
}
export default App;
