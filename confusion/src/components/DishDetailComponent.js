import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    };
  }

  render() {
    const comments = this.props.dishes.comments.map((comment) => {
      return (
        <list className='row' key='comment.id'>
          <ul
            className='col-12'
            style={{ fontSize: '20px', listStyleType: 'none' }}
          >
            <li className='mb-2'>{comment.comment}</li>
            <li className='mb-2'>
              --{comment.author} ,
              {this.state.months[parseInt(comment.date.substring(5, 7)) - 1]},
              {comment.date.substring(8, 10)},{comment.date.substring(0, 4)}
            </li>
          </ul>
        </list>
      );
    });
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-5 m-1'>
            <Card>
              <CardImg
                width='100%'
                src={this.props.dishes.image}
                alt={this.props.dishes.name}
              />
              <CardBody>
                <CardTitle>{this.props.dishes.name}</CardTitle>
                <CardText>{this.props.dishes.description}</CardText>
              </CardBody>
            </Card>
          </div>
          <div className='col-12 col-md-5 m-1'>
            <h3 className='mb-2'>Comments</h3>
            {comments}
          </div>
        </div>
      </div>
    );
  }
}
export default DishDetailComponent;
