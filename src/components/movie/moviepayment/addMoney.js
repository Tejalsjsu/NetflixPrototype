import React, { Component } from "react";
import { Link, withRouter, Route } from "react-router-dom";
import cookie from "react-cookies";
import * as API from "../../../api";
import queryString from "query-string";

let icon = require("../../../image/logo.png");
let header = require("../../../image/cardHeader.png");
let visa = require("../../../image/visa-card.png");
let flag = require("../../../image/united-states.png");
let visa_verified = require("../../../image/visa-verified.png");
let img_style = { width: "560px", height: "70px" };

class addMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: {
        userId: localStorage.getItem("userId"),
        cardNo: "",
        expiryDate: "",
        cardHolderName: "",
        ccv: "",
        billingZip: "",
        depositAmount:
          queryString.parse(this.props.location.search) &&
          queryString.parse(this.props.location.search).total,
        processingFee: "",
        totalAmount: "",
        year: "",
        Type: "",
        movieId:
          queryString.parse(this.props.location.search) &&
          queryString.parse(this.props.location.search).MovieId,
        month: "",
        year: ""
      }
    };
  }

  handleSubmit = () => {
    console.log(this.state);
    let payment = {
      userId: this.state.userdata.userId,
      movieId:
        queryString.parse(this.props.location.search) &&
        queryString.parse(this.props.location.search).MovieId,
      quantity: 1,
      paymentDetail: {
        xref: this.state.userdata.cardNo,
        cvv: this.state.userdata.ccv,
        expMonth: this.state.userdata.month,
        expYear: this.state.userdata.year,
        cardName: this.state.userdata.cardHolderName,
        cardType: this.state.userdata.cardHolderName,
        zipCode: this.state.userdata.billingZip,
        customerId: this.state.userdata.userId
      },
      typeOfPayment: "PayPerView",
      total:
        queryString.parse(this.props.location.search) &&
        queryString.parse(this.props.location.search).total
    };

    API.addMoneyPPV(payment).then(res => {
      console.log(res);
      if (res.status === 200) {
        //need to redirect
        console.log("tuan test", res.data.orderId);
        this.props.history.push({
          pathname: "/movieDetails",
          search: "?MovieId=" + payment.movieId,
          state: { detail: res.data.orderId }
        });
      } else {
        this.setState({
          isLoggedIn: true,
          message: "Payment Failed. Try again..!!"
        });
      }
    });
  };

  render() {
    return (
      <div className="main-content">
        <div className="container">
          {" "}
          <br />
          <div className="text-left">
            <div>
              {/*<div className="col-md-3">*/}
              {this.state.message && (
                <div className="alert alert-warning" role="alert">
                  {this.state.message}
                </div>
              )}
              {/*</div>*/}
            </div>
          </div>
          <h1 align="left">
            {" "}
            <strong> Select Payment Method for Pay Per View </strong>
          </h1>{" "}
          <br />
          <div className="Grid col-sm-16">
            <div className="col-sm-5">
              <img src={header} alt="header" style={img_style} />
              <div className="PaymentMethod-content-inner">
                <div className="PaymentMethod-form-group">
                  <div className="PaymentMethod-form-column--medium">
                    <div className="Payment-label">Card Number:</div>
                    <input
                      type="Number"
                      className="form-control large-input"
                      id="cardNo"
                      value={this.state.userdata.cardNo}
                      onChange={event => {
                        this.setState({
                          userdata: {
                            ...this.state.userdata,
                            cardNo: event.target.value
                          }
                        });
                      }}
                    />
                  </div>

                  <div className="PaymentMethod-form-column--small">
                    <div className="Payment-label">Expiry Month:</div>
                    <input
                      className="form-control large-input"
                      placeholder="MM"
                      value={this.state.userdata.month}
                      onChange={event => {
                        this.setState({
                          userdata: {
                            ...this.state.userdata,
                            month: event.target.value
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="PaymentMethod-form-column--small">
                    <div className="Payment-label">Expiry Year:</div>
                    <input
                      className="form-control large-input"
                      placeholder="YYYY"
                      value={this.state.userdata.year}
                      onChange={event => {
                        this.setState({
                          userdata: {
                            ...this.state.userdata,
                            year: event.target.value
                          }
                        });
                      }}
                    />
                  </div>
                </div>
                <br />
                <div className="PaymentMethod-form-group">
                  <div className="PaymentMethod-form-column--medium">
                    <div className="Payment-label">Card Holder Name:</div>
                    <input
                      className="form-control large-input"
                      id="cardName"
                      value={this.state.userdata.cardHolderName}
                      onChange={event => {
                        this.setState({
                          userdata: {
                            ...this.state.userdata,
                            cardHolderName: event.target.value
                          }
                        });
                      }}
                    />
                  </div>

                  <div className="PaymentMethod-form-column--small">
                    <div className="Payment-label">CCV/CVV:</div>
                    <input
                      className="form-control large-input"
                      placeholder="234"
                      value={this.state.userdata.ccv}
                      onChange={event => {
                        this.setState({
                          userdata: {
                            ...this.state.userdata,
                            ccv: event.target.value
                          }
                        });
                      }}
                    />
                  </div>
                </div>
                <br />
                <div className="PaymentMethod-form-group">
                  <div className="PaymentMethod-form-column--medium">
                    <div className="Payment-label">Billing Zip Code:</div>
                    <input
                      className="form-control large-input"
                      value={this.state.userdata.billingZip}
                      onChange={event => {
                        this.setState({
                          userdata: {
                            ...this.state.userdata,
                            billingZip: event.target.value
                          }
                        });
                      }}
                    />
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="PaymentMethod-form-column--medium">
                    <div className="Payment-label">Card Type</div>
                    <input
                      className="form-control large-input"
                      value={this.state.userdata.Type}
                      onChange={event => {
                        this.setState({
                          userdata: {
                            ...this.state.userdata,
                            Type: event.target.value
                          }
                        });
                      }}
                    />
                  </div>
                </div>{" "}
                <br />
                <div className="PaymentMethod-form-group">
                  <div className="PaymentMethod-form-column--medium">
                    <img src={visa} alt="visa" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 padding-l30">
              <div className="PagePayments-summary">
                <div className="PagePayments-summary-header">
                  <div className="Payment-label padding-t10">
                    Deposit Currency:
                  </div>
                  <div className="PagePayments-currency">
                    <select
                      name="currency"
                      id="currency"
                      className="form-control large-input"
                    >
                      <option value="USD">
                        <span className="PagePayments-currency-flag">
                          <img src={flag} alt="flag" />
                        </span>{" "}
                        USD{" "}
                      </option>
                    </select>
                  </div>
                </div>

                <table className="PagePayments-summary-table">
                  <tbody>
                    <tr>
                      <th className="PagePayments-summary-title" />
                      <th className="PagePayments-summary-amount"> Amount</th>
                      <th className="PagePayments-summary-currency">
                        {" "}
                        Currency
                      </th>
                    </tr>
                    <tr className="PagePayments-summary-group padding-t10">
                      <td className="PagePayments-summary-column Payment-label">
                        {" "}
                        Deposit Amount{" "}
                      </td>
                      <td className="PagePayments-summary-column">
                        <input
                          type="text"
                          className="form-control large-input"
                          placeholder="30"
                          value={this.state.userdata.depositAmount}
                          onChange={event => {
                            this.setState({
                              userdata: {
                                ...this.state.userdata,
                                depositAmount: event.target.value,
                                processingFee: event.target.value * 0.023 + 0.3,
                                totalAmount:
                                  Number(event.target.value * 0.023 + 0.3) +
                                  Number(event.target.value)
                              }
                            });
                          }}
                        />{" "}
                      </td>
                      <td className="PagePayments-summary-column"> USD </td>
                    </tr>
                    {/*<tr>*/}
                    {/*<td className="PagePayments-summary-column Payment-label"> Processing Fee </td>*/}
                    {/*<td className="PagePayments-summary-column"> {this.state.userdata.processingFee} </td>*/}
                    {/*<td className="PagePayments-summary-column"> USD </td>*/}
                    {/*</tr>*/}
                    <tr className="PagePayments-summary-group padding-t10">
                      <td className="PagePayments-summary-column Payment-label">
                        {" "}
                        Total{" "}
                      </td>
                      <td className="PagePayments-summary-column">
                        {this.state.userdata.depositAmount}
                      </td>
                      <td className="PagePayments-summary-column"> USD </td>
                    </tr>
                  </tbody>
                </table>

                <button
                  className="PagePayments-summary-btn btn btn-xlarge btn-info btn-block"
                  onClick={() => this.handleSubmit()}
                >
                  {" "}
                  Confirm Payment
                </button>
                <div className="PagePayments-summary-footer">
                  You agree to authorize the use of your card for this deposit
                  and future payments
                </div>
              </div>
            </div>
            <img src={visa_verified} alt="visa" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default addMoney;
