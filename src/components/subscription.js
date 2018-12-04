import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import cookie from "react-cookies";
import * as API from "../api";
import NavBar from '../components/navbar';
import queryString from "query-string";
var FinancialNavBar = require('../components/financialNavBar');

let icon = require('../image/logo.png')
let header = require('../image/cardHeader.png')
let visa = require('../image/visa-card.png')
let flag = require('../image/united-states.png')
let visa_verified = require('../image/visa-verified.png')
let img_style = {width:'560px', height: '70px'}


class subscription extends Component {
    state = {
        userdata:{
            userId: localStorage.getItem('userId'),
            cardNo:'',
            expiryDate:'',
            cardHolderName:'',
            ccv:'',
            billingZip:'',
            depositAmount: queryString.parse(this.props.location.search) && queryString.parse(this.props.location.search).total,
            processingFee:'',
            totalAmount:'',
            year: '',
            Type: ''
        }

    }

    handleSubmit = () => {
        console.log(this.state);
        let payment = {
            "userId":this.state.userdata.userId,
            "quantity": this.state.userdata.depositAmount,
            "paymentDetail": {
                "xref": this.state.userdata.cardNo,
                "cvv": this.state.userdata.ccv,
                "expMonth": this.state.userdata.expiryDate,
                "expYear": this.state.userdata.expiryDate,
                "cardName": this.state.userdata.cardHolderName,
                "cardType": this.state.userdata.cardHolderName,
                "zipCode": this.state.userdata.billingZip,
                "customerId": this.state.userdata.userId
            },
            "typeOfPayment": "renewal"
        }
        API.addMoney(payment)
            .then((res) => {
                console.log(res.status);
                if (res.status === 200) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Subscribed Successfully..!!"
                    });
                    this.props.history.push('/Dashboard');
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: true,
                        message: "Payment Failed. Try again..!!",
                    });
                }else if (res.status === '402') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Session Expired..!!",
                    });
                    this.props.history.push('/login');
                }
            });
    };

    render() {
        return(
            <div className="main-content">
                <NavBar/>

                <div className="container"> <br/>
                    <div className="text-left">
                        <div >
                            {/*<div className="col-md-3">*/}
                            {this.state.message && (
                                <div className="alert alert-warning" role="alert">
                                    {this.state.message}
                                </div>
                            )}
                            {/*</div>*/}
                        </div>
                    </div>
                    <h1 align="left"> <strong> Select Payment Method for Subscription </strong></h1>  <br/>
                    <div className="Grid col-sm-16">
                        <div className="col-sm-5">
                            <img src={header} alt="header" style={img_style}/>
                            <div className="PaymentMethod-content-inner">
                                <div className="PaymentMethod-form-group">

                                    <div className="PaymentMethod-form-column--medium">
                                        <div className="Payment-label">Card Number:</div>
                                        <input type="Number" className="form-control large-input" id="cardNo" value={this.state.userdata.cardNo}
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           cardNo: event.target.value
                                                       }
                                                   });
                                               }}/>
                                    </div>

                                    <div className="PaymentMethod-form-column--small">
                                        <div className="Payment-label">Expiry Month:</div>
                                        <input className="form-control large-input" placeholder="MM" value={this.state.userdata.expiryDate}
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           expiryDate: event.target.value
                                                       }
                                                   });
                                               }}/>
                                    </div>
                                    <div className="PaymentMethod-form-column--small">
                                        <div className="Payment-label">Expiry Year:</div>
                                        <input className="form-control large-input" placeholder="YYYY" value={this.state.userdata.year}
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           year: event.target.value
                                                       }
                                                   });
                                               }}/>
                                    </div>
                                </div><br/>
                                <div className="PaymentMethod-form-group">

                                    <div className="PaymentMethod-form-column--medium">
                                        <div className="Payment-label">Card Holder Name:</div>
                                        <input className="form-control large-input" id="cardName" value={this.state.userdata.cardHolderName}
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           cardHolderName: event.target.value
                                                       }
                                                   });
                                               }}/>
                                    </div>

                                    <div className="PaymentMethod-form-column--small">
                                        <div className="Payment-label">CCV/CVV:</div>
                                        <input className="form-control large-input" placeholder="234" value={this.state.userdata.ccv}
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           ccv: event.target.value
                                                       }
                                                   });
                                               }}/>
                                    </div>
                                </div><br/>

                                <div className="PaymentMethod-form-group">

                                    <div className="PaymentMethod-form-column--medium">
                                        <div className="Payment-label">Billing Zip Code:</div>
                                        <input className="form-control large-input" value={this.state.userdata.billingZip}
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           billingZip: event.target.value
                                                       }
                                                   });
                                               }}/>
                                    </div>&nbsp;&nbsp;&nbsp;&nbsp;


                                    <div className="PaymentMethod-form-column--medium">
                                        <div className="Payment-label">Card Type</div>
                                        <input className="form-control large-input" value={this.state.userdata.Type}
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           Type: event.target.value
                                                       }
                                                   });
                                               }}/>
                                    </div>

                                </div> <br/>

                                <div className="PaymentMethod-form-group">
                                    <div className="PaymentMethod-form-column--medium">
                                        <img src={visa} alt="visa"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 padding-l30">
                            <div className="PagePayments-summary">
                                <div className="PagePayments-summary-header">
                                    <div className="Payment-label padding-t10">Deposit Currency:</div>
                                    <div className="PagePayments-currency"><select name="currency" id="currency" className="form-control large-input">
                                        <option value="USD"><span className="PagePayments-currency-flag"><img src={flag} alt="flag"/></span> USD </option>
                                    </select></div>
                                </div>


                                <table className="PagePayments-summary-table">
                                    <tbody>
                                    <tr>
                                        <th className="PagePayments-summary-title"></th>
                                        <th className="PagePayments-summary-amount"> Months</th>
                                        <th className="PagePayments-summary-amount"> Rate</th>
                                    </tr>
                                    <tr className="PagePayments-summary-group padding-t10">
                                        <td className="PagePayments-summary-column Payment-label"> Months </td>
                                        <td className="PagePayments-summary-column">
                                            <input type="text" className="form-control large-input" placeholder="30" value={this.state.userdata.depositAmount}
                                                   onChange={(event) => {
                                                       this.setState({
                                                           userdata: {
                                                               ...this.state.userdata,
                                                               depositAmount : event.target.value,
                                                               totalAmount: Number(event.target.value) * 10
                                                           }
                                                       });
                                                   }}
                                            /> </td>
                                        <td className="PagePayments-summary-column"> 10 </td>
                                    </tr>
                                    {/*<tr>*/}
                                    {/*<td className="PagePayments-summary-column Payment-label"> Processing Fee </td>*/}
                                    {/*<td className="PagePayments-summary-column"> {this.state.userdata.processingFee} </td>*/}
                                    {/*<td className="PagePayments-summary-column"> USD </td>*/}
                                    {/*</tr>*/}
                                    <tr className="PagePayments-summary-group padding-t10">
                                        <td className="PagePayments-summary-column Payment-label"> Total </td>
                                        <td className="PagePayments-summary-column">{this.state.userdata.totalAmount}</td>
                                        <td className="PagePayments-summary-column"> USD </td>
                                    </tr>
                                    </tbody>
                                </table>

                                <button className="PagePayments-summary-btn btn btn-xlarge btn-info btn-block"
                                        onClick={() => this.handleSubmit()}> Confirm Payment</button>
                                <div className="PagePayments-summary-footer">You agree to authorize the use of your card for this deposit and future payments</div>

                            </div>

                        </div>
                        <img src={visa_verified} alt="visa"/>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(subscription);