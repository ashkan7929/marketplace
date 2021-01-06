import React, { useState } from "react";

import { Col, Input, InputGroup, InputGroupAddon, Row } from "reactstrap";
import ShopList from "../components/ShopList";

function Home() {
  const [query, updateQuery] = useState("");
  return (
    <div className="container-fluid">
      <Row dir="rtl">
        <Col>
          <div className="search">
            <InputGroup>
              <div className="btn btn-outline-primary" addonType="append"> جستجو </div>
              <Input
                onChange={e => updateQuery(e.target.value.toLocaleLowerCase())}
                value={query}
              />
            </InputGroup>
          </div>
          <ShopList search={query} />
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
      </style>
    </div>
  );
}
export default Home;