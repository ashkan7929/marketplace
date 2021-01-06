import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const QUERY = gql`
  {
    shops {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

function ShopList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "";


  if (loading) return <h1> </h1>;
  if (data.shops && data.shops.length) {
    
    const searchQuery = data.shops.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <Row dir="rtl">
          {searchQuery.map((res) => (
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                />
                <CardBody className="text-right">
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/shpos/${res.id}`}
                    href={`/shops?id=${res.id}`}
                  >
                    <a className="btn btn-primary">نمایش</a>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </Row>
      );
    } else {
      return <h1></h1>;
    }
  }
  return <h5>افزودن فروشگاه ها</h5>;
}
export default ShopList;