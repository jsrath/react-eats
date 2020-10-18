import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, Fa } from 'mdbreact';
import './Items.css';
import drinksIcon from '../icons/drinks.svg';
import mainDishesIcon from '../icons/main-dishes.svg';
import startersIcon from '../icons/starters.svg';
import pizzasIcon from '../icons/pizzas.svg';
import dessertsIcon from '../icons/desserts.svg';
import soupsIcon from '../icons/soups.svg';
import vegIcon from '../icons/veg.svg';
import spicyIcon from '../icons/spicy.svg';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      apiUrl: [],
    };
  }

  componentDidMount() {
    this.setState({ apiUrl: this.props.apiUrl }, () =>
      fetch(this.state.apiUrl)
        .then(response => response.json())
        .then(items => this.setState({ items })),
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ apiUrl: nextProps.apiUrl }, () =>
      fetch(this.state.apiUrl)
        .then(response => response.json())
        .then(items => this.setState({ items })),
    );
  }

  render() {
    return (
      <div className="container my-3">
        <div className="row mb-5">
          {this.state.items.map((item, index) => (
            <div className="col-md-4 mt-4" key={index}>
              <Card className="itemCard text-center">
                <div className="indigo darken-3 text-white p-3 text-center">
                  {(() => {
                    switch (item.Category) {
                      case 'Starter':
                        return (
                          <h6>
                            <img src={startersIcon} alt="starter" /> Előétel
                          </h6>
                        );
                      case 'Soup':
                        return (
                          <h6>
                            <img src={soupsIcon} alt="soup" /> Leves
                          </h6>
                        );
                      case 'MainDish':
                        return (
                          <h6>
                            <img src={mainDishesIcon} alt="main dish" /> Főétel
                          </h6>
                        );
                      case 'Pizza':
                        return (
                          <h6>
                            <img src={pizzasIcon} alt="pizza" /> Pizza
                          </h6>
                        );
                      case 'Dessert':
                        return (
                          <h6>
                            <img src={dessertsIcon} alt="dessert" />
                            Desszert
                          </h6>
                        );
                      case 'Drink':
                        return (
                          <h6>
                            <img src={drinksIcon} alt="drink" /> Ital
                          </h6>
                        );
                      default:
                        return null;
                    }
                  })()}
                </div>
                <CardTitle className="p-3 itemTitle">{item.Name ? item.Name : item.Description}</CardTitle>
                <CardImage className="img-fluid img-fit" src={require(`../images/${item.Id}.jpg`)} />
                <CardBody className="justify-content-center">
                  <h6 className="description">{item.Description}</h6>
                  <h6 className="special">
                    {item.Vegetarian === 1 && <img src={vegIcon} alt="vegetarian" />}
                    {item.Spicy === 1 && <img src={spicyIcon} alt="spicy" />}
                  </h6>
                  <h4 className="my-4 indigo-text">{item.Price} HUF</h4>
                  <Button data-name={item.Name} data-price={item.Price} onClick={this.props.handleAddToCart} className="indigo darken-3 button-bottom">
                    <Fa className="pr-2" icon="shopping-cart" /> Add to Cart
                  </Button>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Items;
