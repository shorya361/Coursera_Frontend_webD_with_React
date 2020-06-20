import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
function RenderCard({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else {
    return (
      <Card>
        <CardImg src={item.image} alt={item.name} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? (
            <CardSubtitle>{item.designation}</CardSubtitle>
          ) : null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    );
  }
}

function Home(props) {
  return (
    <div className='container'>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to='/home'>Home</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className='col-12'>
        <h3>Home</h3>
      </div>
      <div className='row align-item-start'>
        <div className='col-12 col-md m-1'>
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMess={props.dishesErrMess}
          />
        </div>
        <div className='col-12 col-md m-1'>
          <RenderCard item={props.promotions} />
        </div>
        <div className='col-12 col-md m-1'>
          <RenderCard item={props.leader} />
        </div>
      </div>
    </div>
  );
}

export default Home;
