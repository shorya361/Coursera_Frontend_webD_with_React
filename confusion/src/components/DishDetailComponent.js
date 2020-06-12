import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetailComponent extends Component {
  render() {
    console.log('inside dish detail', this.props.dish);
    const comments = this.props.dish.comments.map((comment) => {
      return (
        <div>
          <list className='row' key='comment.id'>
            <ul
              className='col-12'
              style={{ fontSize: '18px', listStyleType: 'none' }}
            >
              <li className='mb-2'>{comment.comment}</li>
              <li className='mb-2'>
                --{comment.author} ,
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                }).format(new Date(Date.parse(comment.date)))}
              </li>
            </ul>
          </list>
        </div>
      );
    });
    const dishes = (
      <Card style={{ height: '100%' }}>
        <CardImg
          width='100%'
          height='65%'
          src={this.props.dish.image}
          alt={this.props.dish.name}
        />
        <CardBody>
          <CardTitle>{this.props.dish.name}</CardTitle>
          <CardText>{this.props.dish.description}</CardText>
        </CardBody>
      </Card>
    );

    return (
      <div className='container'>
        {
          <div className='row'>
            <div className='col-12 col-md-5 m-1'>{dishes}</div>
            <div className='col-12 col-md-5 m-1' style={{ height: '100%' }}>
              <h3 className='mb-2'>Comments</h3>
              {comments}
            </div>
          </div>
        }
      </div>
    );
  }
}
export default DishDetailComponent;
