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
import {
  postComments,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    leaders: state.leaders,
    comments: state.comments,
    promotions: state.promotions,
    feedback: state.feedback,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComments: (dishId, rating, author, comment) =>
    dispatch(postComments(dishId, rating, author, comment)),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),

  fetchDishes: () => {
    dispatch(fetchDishes());
  },

  resetFeedbackForm: () => {
    dispatch(actions.reset('feedback'));
  },

  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },

  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
    // console.log('at the start : jai hind' + this.props.dishes);
  }
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    console.log(this.props);
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotions={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leaders={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetailComponent
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishid, 10)
            )[0]
          }
          allcomments={this.props.comments}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishid, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          postComments={this.props.postComments}
        />
      );
    };

    const AboutUs = () => {
      return <About leaders={this.props.leaders.leaders} />;
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames='page'
            timeout={300}
          >
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route
                exact
                path='/menu'
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route path='/menu/:dishid' component={DishWithId} />
              <Route
                exact
                path='/contactus'
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
              <Route exact path='/aboutus' component={AboutUs} />
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
