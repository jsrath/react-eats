import React, { Component } from 'react';
import { Button, Card, CardBody, Container, Table, TableBody, TableHead } from 'mdbreact';
import './Cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processOrder: false,
      name: '',
      address: '',
      phone: '',
    };
    this.finalizeOrder = this.finalizeOrder.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
  }

  finalizeOrder() {
    this.setState(() => ({
      processOrder: true,
    }));
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleAddress(event) {
    this.setState({ address: event.target.value });
  }

  handlePhone(event) {
    this.setState({ phone: event.target.value });
  }

  render() {
    return (
      <Container className="my-3">
        <Card>
          <CardBody>
            <Table striped responsive className="table product-table">
              <TableHead color="indigo darken-3" textWhite>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </TableHead>
              <TableBody>
                {this.props.cart.map((item, index) => (
                  <tr key={item.name}>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle">{item.price}</td>
                    <td className="align-middle">{item.quantity}</td>
                    <td className="align-middle">
                      <Button color="danger" data-index={index} onClick={this.props.handleDelete}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
                {this.props.totalQuantity !== 0 ? (
                  <tr className="table-dark text-dark">
                    <td className="align-middle">
                      <h6 className="font-weight-bold">Total</h6>
                    </td>
                    <td className="align-middle">
                      <h6 className="font-weight-bold">{this.props.totalPrice}</h6>
                    </td>
                    <td className="align-middle">
                      <h6 className="font-weight-bold">{this.props.totalQuantity}</h6>
                    </td>
                    <td className="align-middle">
                      <Button className="indigo darken-3" onClick={this.finalizeOrder}>
                        Proceed
                      </Button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="4">
                      <h5 className="my-3 pl-2">No Items in Cart</h5>
                    </td>
                  </tr>
                )}
              </TableBody>
            </Table>

            {this.state.processOrder === true && this.props.cart.length !== 0 ? (
              <Card className="w-75 p-3">
                <form
                  onSubmit={this.props.handleSubmit}
                  data-orderquantity={this.props.totalQuantity}
                  data-orderprice={this.props.totalPrice}
                  data-name={this.state.name}
                  data-address={this.state.address}
                  data-phone={this.state.phone}
                >
                  <h5 className="my-4">Add Your Details</h5>
                  <label htmlFor="name" className="grey-text">
                    Name
                  </label>
                  <input type="text" onChange={this.handleName} value={this.state.name} name="userName" className="form-control" />
                  <br />
                  <label htmlFor="address" id="userAddress" className="grey-text">
                    Address
                  </label>
                  <input type="text" onChange={this.handleAddress} value={this.state.address} name="userAddress" className="form-control" />
                  <br />
                  <label htmlFor="userPhone" className="grey-text">
                    Phone
                  </label>
                  <input type="text" onChange={this.handlePhone} value={this.state.phone} name="userName" className="form-control" />
                  <Button type="submit" className="indigo darken-3 w-25 mt-4">
                    Submit Order
                  </Button>
                </form>
              </Card>
            ) : null}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Cart;
