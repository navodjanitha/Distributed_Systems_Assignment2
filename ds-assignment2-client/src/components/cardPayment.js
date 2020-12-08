import React,{Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import CreateReservation from "./createTicketReservation";

export default class CardPayment extends  Component{
    constructor(props){
        super(props);

        this.onChangeHolderName = this.onChangeHolderName.bind(this);
        this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        this.onChangeCvc = this.onChangeCvc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            mobileNumber: '',
            cardNumber: '',
            cvc: '',
            total: this.props.totalPrice
        }
    }

    onChangeHolderName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeMobileNumber(e){
        this.setState({
            mobileNumber: e.target.value
        });
    }

    onChangeCardNumber(e){
        this.setState({
            cardNumber: e.target.value
        });
    }

    onChangeCvc(e){
        this.setState({
            cvc: e.target.value
        });
    }


    // this method will submit the card payment details
    onSubmit(e){
        e.preventDefault();

        console.log('Form Submitted:');
        console.log('name: ${this.state.name}');
        console.log('mobileNumber : ${this.state.mobileNumber}');
        console.log('cardNumber: ${this.state.cardNumber}');
        console.log('cvc: ${this.state.cvc}');
        console.log('total: ${this.state.total}');

        const newPayment = {
            name: this.state.name,
            mobileNumber: this.state.mobileNumber,
            cardNumber: this.state.cardNumber,
            cvc: this.state.cvc,
            total: this.state.total
        }

        axios.post('http://localhost:4001/demo/addCardPayment', newPayment)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            mobileNumber: '',
            cardNumber: '',
            cvc: '',
            total: this.props.totalPrice
        })

    }



    render() {
        return(
        <div style={{margineTop: 50}}>
            <div className="container">
            <form onSubmit={this.onSubmit}>

                <div className="form-group">
                    <h1>Card Payment</h1>
                </div>

                <div className="form-group">
                    <label>Name on the card:</label>
                    <input type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeHolderName}/>
                </div>

                <div className="form-group">
                    <label>Card Number:</label>
                    <input type="text"
                           className="form-control"
                           value={this.state.cardNumber}
                           onChange={this.onChangeCardNumber}/>
                </div>

                <div className="form-group">
                    <label>CVC:</label>
                    <input type="text"
                           className="form-control"
                           value={this.state.cvc}
                           onChange={this.onChangeCvc}/>
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="text"
                           className="form-control"
                           value={this.state.mobileNumber}
                           onChange={this.onChangeMobileNumber}/>
                </div>

                <div>
                    <label>Amount:</label>
                    <input  type="text"
                            className="form-control"
                            value={this.state.total}
                            readOnly={true}/>
                </div>


                <div>
                <p></p>
                </div>

                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary"/>
                </div>

            </form>
            </div>
        </div>
    );
}
}
