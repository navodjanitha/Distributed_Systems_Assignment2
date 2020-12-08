import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Train = props => (
    <tr>
        <td>{props.demo.name}</td>
        <td>{props.demo.date}</td>
        <td>{props.demo.from}</td>
        <td>{props.demo.to}</td>
        <td>{props.demo.ticketPrice}</td>
        <td>
            <Link to={"/reserve/"+props.demo._id}>Book</Link>
        </td>
    </tr>
)

export default class TrainList extends Component{

    constructor(props){
        super(props);
        this.state = {demo: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4001/demo/getAllTrains').then(res => {
            this.setState({
                demo: res.data
            });
            console.log(res.data);
        }).catch(function (err) {
            console.log(err);
        });

    }

    trainList(){
        return this.state.demo.map(function (currentTrain, i) {
            return <Train demo={currentTrain} key={i}/>
        });
    }

    render(){
        return(
            <div>

                <table className="table table-striped " style={{ marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Train</th>
                        <th>Date / Departure Time</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Ticket Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.trainList() }
                    </tbody>
                </table>

            </div>
        )
    }
}
