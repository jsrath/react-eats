import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Items from './components/Items';
import Nav from './components/Nav';
import Cart from './components/Cart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: 'https://react-eats-backend.onrender.com/items',
      cart: [],
      totalPrice: 0,
      totalQuantity: 0,
      cartLimit: 20000,
    };
  }

  handleAddToCart = event => {
    let addedItems = { name: event.target.dataset.name, price: Number(event.target.dataset.price), quantity: 1 };
    let duplicate = false;
    if (this.state.totalPrice + addedItems.price > this.state.cartLimit) {
      return alert('Cart Limit Exceeded');
    }
    if (addedItems.name !== undefined) {
      this.state.cart.forEach((item, index) => {
        if (addedItems.name === item.name) {
          duplicate = true;
          this.setState(
            prevState => {
              const updatedCart = [...prevState.cart];
              updatedCart[index].quantity++;
              return { cart: updatedCart };
            },
            () => this.getCartQuantity(),
          );
        }
      });

      if (duplicate === false) {
        this.setState(
          prevState => ({
            cart: [...prevState.cart, addedItems],
          }),
          () => this.getCartQuantity(),
        );
      }
    }
  };

  getCartQuantity = () => {
    this.getTotalPrice();
    const updatedCart = [...this.state.cart];
    let quant = [];
    updatedCart.forEach(element => {
      quant.push(element.quantity);
    });
    quant = quant.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    this.setState(() => ({
      totalQuantity: quant,
    }));
  };

  getTotalPrice = () => {
    const updatedCart = [...this.state.cart];
    let total = [];
    updatedCart.forEach(element => {
      total.push(element.price * element.quantity);
    });
    total = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    this.setState(() => ({
      totalPrice: total,
    }));
  };

  handleDelete = event => {
    const updatedCart = [...this.state.cart];
    updatedCart.splice(event.target.dataset.index, 1);
    this.setState(
      () => ({
        cart: updatedCart,
      }),
      () => this.getCartQuantity(),
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = {
      quantity: event.target.dataset.orderquantity,
      price: event.target.dataset.orderprice,
      name: event.target.dataset.name,
      address: event.target.dataset.address,
      phone: event.target.dataset.phone,
    };

    fetch('https://react-eats-backend.onrender.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => {
      if (response.status === 201) {
        alert('Order submitted succesfully!');
        this.setState(
          () => ({
            cart: [],
          }),
          () => this.getCartQuantity(),
        );
      }
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Nav cart={this.state.cart} totalQuantity={this.state.totalQuantity} />
          <Switch>
            <Route exact path="/" render={props => <Items {...props} apiUrl={`${this.state.apiUrl}`} handleAddToCart={this.handleAddToCart} />} />
            <Route exact path="/starters" render={props => <Items {...props} apiUrl={`${this.state.apiUrl}?Category=Starter`} handleAddToCart={this.handleAddToCart} />} />
            <Route exact path="/soups" render={props => <Items {...props} apiUrl={`${this.state.apiUrl}?Category=Soup`} handleAddToCart={this.handleAddToCart} />} />
            <Route exact path="/mains" render={props => <Items {...props} apiUrl={`${this.state.apiUrl}?Category=MainDish`} handleAddToCart={this.handleAddToCart} />} />
            <Route exact path="/pizzas" render={props => <Items {...props} apiUrl={`${this.state.apiUrl}?Category=Pizza`} handleAddToCart={this.handleAddToCart} />} />
            <Route exact path="/desserts" render={props => <Items {...props} apiUrl={`${this.state.apiUrl}?Category=Dessert`} handleAddToCart={this.handleAddToCart} />} />
            <Route exact path="/drinks" render={props => <Items {...props} apiUrl={`${this.state.apiUrl}?Category=Drink`} handleAddToCart={this.handleAddToCart} />} />
            <Route
              exact
              path="/cart"
              render={props => (
                <Cart {...props} totalQuantity={this.state.totalQuantity} totalPrice={this.state.totalPrice} handleDelete={this.handleDelete} handleSubmit={this.handleSubmit} cart={this.state.cart} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
