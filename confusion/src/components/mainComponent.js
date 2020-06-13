import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './menuComponent';
import { DISHES } from '../shared/dishes';
import DishDetailComponent from './DishDetailComponent';
import Footer from './FooterComponent';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }
  onDishSelect(dishId) {
    console.log('dish selected');
    this.setState({
      selectedDish: dishId,
    });
  }
  renderDish(dish) {
    if (dish != null) {
      return (
        <DishDetailComponent
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        />
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />

        <div className='row'>{this.renderDish(this.state.selectedDish)}</div>
        <Footer />
      </div>
    );
  }
}
export default Main;
