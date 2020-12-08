import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TrainList from "./trainList";
import CreateReservation from "./createTicketReservation";
import CardPayment from ".//cardPayment";
import MobilePayment from "./mobilePayment";
import Signup from "./signUp";
import Login from "./login";

class AllRoutes extends Component {

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
                                    <Link to="/" className="nav-link">Train List</Link>
                                </li>
                            </ul>
                        </div>

                    </nav>
                    <Route path="/" exact component={TrainList}/>
                    <Route path="/reserve/:id" component={CreateReservation}/>
                    <Route path="/doCardPayment" component={CardPayment}/>
                    <Route path="/doMobilePaymnt" component={MobilePayment}/>
                </div>
            </Router>
        );
    }
}
export default AllRoutes;
