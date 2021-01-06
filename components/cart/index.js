import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardTitle, Badge } from "reactstrap";

import AppContext from "../../context/AppContext";

function Cart() {
  const appContext = useContext(AppContext);
  const router = useRouter();

  const { cart, isAuthenticated } = appContext;

  return (
    <div dir="rtl">
      <Card dir="rtl" style={{ padding: "10px 5px" }} className="cart">
        <CardTitle style={{ margin: 10 }}>سفارش شما:</CardTitle>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>اجناس :</small>
          </div>
          <div>
            {cart.items
              ? cart.items.map((item) => {
                  if (item.quantity > 0) {
                    return (
                      <div
                        className="items-one"
                        style={{ marginBottom: 15 }}
                        key={item.id}
                      >
                        <div>
                          <span id="item-price">&nbsp;{item.price}</span>
                          <span id="item-price"> تومان</span>
                          <span id="item-name">&nbsp; {item.name}</span>
                        </div>
                        <div>
                          <Button
                            style={{
                              height: 25,
                              padding: 0,
                              width: 15,
                              marginRight: 5,
                              marginLeft: 10,
                            }}
                            onClick={() => appContext.addItem(item)}
                            color="link"
                          >
                            +
                          </Button>
                          <Button
                            style={{
                              height: 25,
                              padding: 0,
                              width: 15,
                              marginRight: 10,
                            }}
                            onClick={() => appContext.removeItem(item)}
                            color="link"
                          >
                            -
                          </Button>
                          <span style={{ marginLeft: 5 }} id="item-quantity">
                            {item.quantity} عدد 
                          </span>
                        </div>
                      </div>
                    );
                  }
                })
              : null}
            {isAuthenticated ? (
              cart.items.length > 0 ? (
                <div>
                  <Badge style={{ width: 200, padding: 10 }} color="light">
                    <h5 style={{ fontWeight: 100, color: "gray" }}>مجموع :</h5>
                    <span>{appContext.cart.total.toFixed(0)}</span>
                    <span> تومان </span>
                  </Badge>
                  {router.pathname === "/shops" && (
                    <div
                      style={{
                        marginTop: 10,
                        marginRight: 10,
                      }}
                    >
                      <Link href="/checkout">
                        <Button style={{ width: "100%" }} color="primary">
                          <a>سفارش</a>
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {router.pathname === "/checkout" && (
                    <small
                      style={{ color: "blue" }}
                      onClick={() => window.history.back()}
                    >
                      برگشت به فروشگاه
                    </small>
                  )}
                </>
              )
            ) : (
              <h5>برای سفارش وارد شوید</h5>
            )}
          </div>
          {console.log(router.pathname)}
        </CardBody>
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </div>
  );
}
export default Cart;