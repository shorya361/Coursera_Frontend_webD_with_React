import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from './menuComponent';
import DishDetailComponent from './DishDetailComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    leaders: state.leaders,
    comments: state.comments,
    promotions: state.promotions,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotions={
            this.props.promotions.filter((promo) => promo.featured)[0]
          }
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetailComponent
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishid, 10)
            )[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishid, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    const AboutUs = () => {
      return <About leaders={this.props.leaders} />;
    };

    return (
      <div>
        <Header />

        <Switch>
          <Route path='/home' component={HomePage} />
          <Route
            exact
            path='/menu'
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path='/menu/:dishid' component={DishWithId} />
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/aboutus' component={AboutUs} />
          <Redirect to='/home' />
        </Switch>

        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
