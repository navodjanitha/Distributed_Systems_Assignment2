import React,{Component} from 'react';
import axios from 'axios';
import CardPayment from "./cardPayment";
import MobilePayment from "./mobilePayment";
import ReactDOM from "react-dom";


export default class CreateReservation extends Component{

    constructor(props){
        super(props);

        this.onChangeTrainName = this.onChangeTrainName.bind();
        this.onChangeDate = this.onChangeDate.bind();
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);

        this.state={
            name: '',
            date: '',
            quantity: '',
            ticketPrice: '',
            totalPrice:'',
            nic:''
        }

    }


    onChangeTrainName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    onChangeNIC(e) {
        this.setState({
            nic: e.target.value
        });
    }

    // this will get all the train details from the database
    componentDidMount() {
        axios.get('http://localhost:4001/demo/getTrain/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    date: response.data.date,
                    ticketPrice: response.data.ticketPrice
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // calculate the total amount
    calculateTotalPrice(qty, price){
       var quantity = parseInt(qty);
       var ticketPrice = parseInt(price);

       if (qty == 0){
           return null;
       }

       this.state.totalPrice = quantity * ticketPrice;
      // console.log(quantity);
       return quantity * ticketPrice;
    }

    // If a government user, this method will calculate the discount and return the total amount to be paid
    discount(qty,price,nic){
        var quantity = parseInt(qty);
        var ticketPrice = parseInt(price);
        if (nic == null){
            return this.state.totalPrice = ticketPrice* quantity;
        }
        if (qty == 0){
            return '';
        }
        if (nic.length == 10){
            return  this.state.totalPrice = (ticketPrice-((5/100)*ticketPrice)) * quantity + ' LKR';
        }
        else{
            return this.state.totalPrice = ticketPrice* quantity+ ' LKR';
        }
    }

    // If user select the card payment option, this will render the card payment component
    getCardPay = function(tot){
        if (this.state.totalPrice != ''){
            ReactDOM.render(<CardPayment total={tot} name={this.state.name} totalPrice={this.state.totalPrice}/>, document.getElementById('root'));
        }
    }

    // If user select the mobile payment option, this will render the mobile payment option
    getMobilePay = function(tot){
        if (this.state.totalPrice != ''){
            ReactDOM.render(<MobilePayment total={tot} name={this.state.name} totalPrice={this.state.totalPrice}/>, document.getElementById('root'));
        }
    }
    render(){
        var tot = 0;
        const qty = this.state.quantity;
        const price = this.state.ticketPrice;
        var nic = this.state.nic;
        return(
            <div style={{margineTop: 20}}>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Train: </label>
                        <input type="text"
                               className="form-control"
                                value={this.state.name}
                                readOnly = {true}/>
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.date}
                                readOnly={true}/>
                    </div>


                    <div className="form-group">
                        <label>Quantity:</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.quantity}
                               onChange={this.onChangeQuantity}/>
                    </div>


                    <div className="form-group">
                        <p>----------------------------    (If you are a government employee, you can get a discount from us - Please enter the NIC number)    ----------------------------</p>
                    </div>

                    <div className="form-group">
                        <label>NIC Number: </label>
                        <input type="text"
                               className="form-control"
                               placeholder="Required Only for Government Employees"
                               value={this.state.nic}
                               onChange={this.onChangeNIC}/>
                    </div>


                    <div className="form-group">
                        <label>Total Amount: </label>
                        <input type="text"
                               className="form-control"
                               value={this.discount(qty, price, nic)}
                               readOnly={true}/>
                    </div>


                    <div className="row">
                        <div className="col-md-2">
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.getCardPay(tot)}>Card Payment</button>
                        </div>
                        <div className="col-md-5">
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.getMobilePay(tot)}>Mobile Payment</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
