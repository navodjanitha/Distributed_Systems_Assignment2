import React,{Component} from 'react';
import axios from 'axios';

export default class MobilePayment extends Component{
    constructor(props){
        super(props);

        this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
        this.onChangePin = this.onChangePin.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            mobileNumber: '',
            pin: '',
            amount: this.props.totalPrice
        }
    }

    onChangeMobileNumber(e){
        this.setState({
            mobileNumber: e.target.value
        });
    }
    onChangePin(e){
        this.setState({
            pin: e.target.value
        });
    }
    onChangeAmount(e){
        this.setState({
            amount: e.target.value
        });
    }

    // this method will submit the payment details , payment will be added to the user's monthly dialog mobile bill
    onSubmit(e){
        e.preventDefault();

        console.log('Form Submitted:');
        console.log('Mobile Number: ${this.state.mobileNumber}');
        console.log('Pin: ${this.state.pin}');
        console.log('Amount: ${this.state.amount}');

        const newMobilePayment = {
            mobileNumber: this.state.mobileNumber,
            pin: this.state.pin,
            amount: this.state.amount
        }

        axios.post('http://localhost:4001/demo/addMobilePayment', newMobilePayment)
            .then(res => console.log(res.data));


        this.setState({
            mobileNumber: '',
            pin: '',
            amount: ''
        })
    }




    render() {
        return(
            <div style={{margineTop: 20}}>
                <div className="container">
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <h1>Mobile Payment</h1>
                    </div>
                    <div className="form-group">
                        <label>Mobile Number:</label>
                        <input type="text"
                               placeholder="Ex : 94715465897"
                               className="form-control"
                               value={this.state.mobileNumber}
                               onChange={this.onChangeMobileNumber}/>
                    </div>


                    <div className="form-group">
                        <label>PIN:</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.pin}
                               onChange={this.onChangePin}/>

                    </div>

                    <div className="form-group">
                        <label>Amount:</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.amount}
                               onChange={this.onChangeAmount}
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
