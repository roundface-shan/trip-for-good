import React from "react";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col } from "antd";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { placeOrder } from "../../redux/order/slice";
import { CheckOutCard } from "../../components";

export const PlaceOrderPage: React.FC = (props) => {
    const jwt = useSelector(state => state.signIn.token) as string
    const loading = useSelector(state => state.order.loading)
    const order = useSelector(state => state.order.currentOrder)

    const dispatch = useAppDispatch()

  return (
    <MainLayout>
      <Row>
        <Col span={12} style={{marginTop: 50}}>
            <h1>*这里原本有张信用卡</h1>
        </Col>
        <Col span={12}>
            <CheckOutCard 
                loading={loading}
                order={order}
                onCheckout={() => dispatch(placeOrder({jwt, orderId: order.id}))}
            />
        </Col>
      </Row>
    </MainLayout>
  );
};
