import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Input,
  Label,
  Button,
  Col,
} from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/bseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;

const minLength = (len) => (val) => val && val.length >= len;

class DishDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      istoggleModal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log(this.props);
    this.DishDetail = this.DishDetail.bind(this);
  }

  toggleModal() {
    this.setState({
      istoggleModal: !this.state.istoggleModal,
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    console.log(this.props.allcomments.comments.length);
    console.log('values :', values);
    this.props.postComments(
      this.props.dish.id,
      values.rating,
      values.name,
      values.comment
    );
    // console.log(values);
  }

  DishDetail() {
    if (this.props.isLoading) {
      return (
        <div className='container'>
          <div className='row'>
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className='container'>
          <div className='row'>
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else {
      const comments = this.props.comments.map((comment) => {
        return (
          <Fade in>
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
          </Fade>
        );
      });

      return (
        <div className='container'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='row'>
            <div className='col-12 col-md-5 m-1'>
              <FadeTransform
                in
                transformProps={{ exitTranform: 'scale(0.5) translateY(-50%)' }}
              >
                <Card style={{ height: '100%' }}>
                  <CardImg
                    width='100%'
                    height='65%'
                    src={baseUrl + this.props.dish.image}
                    alt={this.props.dish.name}
                  />
                  <CardBody>
                    <CardTitle>{this.props.dish.name}</CardTitle>
                    <CardText>{this.props.dish.description}</CardText>
                  </CardBody>
                </Card>
              </FadeTransform>
            </div>
            <div className='col-12 col-md-5 m-1' style={{ height: '100%' }}>
              <h3 className='mb-2'>Comments</h3>
              <Stagger in>{comments}</Stagger>
              <Button outline onClick={this.toggleModal}>
                <span className='fa fa-pencil'></span>Submit Comment
              </Button>
              <Modal
                isOpen={this.state.istoggleModal}
                toggle={this.toggleModal}
              >
                <ModalHeader toggle={this.toggleModal}>
                  {' '}
                  Submit Comment
                </ModalHeader>
                <ModalBody md={10}>
                  <div className='container'>
                    <LocalForm onSubmit={this.handleSubmit}>
                      <Row className='form-group'>
                        <Label htmlFor='rating'>Rating</Label>

                        <Control.select
                          model='.rating'
                          name='rating'
                          className='form-control'
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Control.select>
                      </Row>

                      <Row className='form-group'>
                        <Label htmlFor='name'>Name</Label>

                        <Control.text
                          model='.name'
                          id='name'
                          name='name'
                          className='form-control'
                          validators={{
                            required,
                            minLength: minLength(3),
                            maxLength: maxLength(15),
                          }}
                        />
                      </Row>
                      <Errors
                        className='text-danger'
                        model='.name'
                        show='touched'
                        messages={{
                          required: 'Required  ',
                          minLength: 'Must be greater than 2 characters  ',
                          maxLength: 'Must be 15 characters or less',
                        }}
                      />

                      <Row className='form-group'>
                        <Label htmlFor='comment'>Comment</Label>

                        <Control.textarea
                          model='.comment'
                          id='comment'
                          name='comment'
                          rows='6'
                          className='form-control'
                        />
                      </Row>
                      <Row className='form-group'>
                        <Col>
                          <Button type='submit' color='primary'>
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </LocalForm>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return <div>{this.DishDetail()}</div>;
  }
}
export default DishDetailComponent;
