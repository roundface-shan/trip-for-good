import React from "react";
import styles from "./ShoppingCart.module.css";
import { MainLayout } from "../../layouts/mainLayout";
import {Row, Col, Affix } from "antd";
import { ProductList, PaymentCard } from "../../components";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { clearShoppingCartItem } from "../../redux/shoppingCart/slice";

export const ShoppingCartPage: React.FC = (props) => {

    const isLoading = useSelector((state) => state.shoppingCart.loading)
    const shoppingCartItems = useSelector((state) => state.shoppingCart.items)
    const jwt = useSelector((state) => state.signIn.token) as string

    const dispatch = useAppDispatch()

    return (
        <MainLayout>
            <Row>
                {/* 购物车清单 */}
                <Col span={16}>
                    <div className={styles['product-list-container']}>
                        <ProductList
                            data={shoppingCartItems.map(s => s.touristRoute)}
                        />
                    </div>
                </Col>
                {/* 支付卡 */}
                <Col span={8}>
                    <Affix>
                        <div className={styles['payment-card-container']}>
                            <PaymentCard
                                loading={isLoading}
                                originalPrice={Math.round(shoppingCartItems
                                    .map((s) => s.originalPrice)
                                    .reduce((a, b) => a + b, 0))}
                                price={Math.round(shoppingCartItems
                                    .map((s) => s.originalPrice *
                                    (s.discountPresent ?? 1))
                                    .reduce((a, b) => a + b, 0))}
                                onCheckout={() => {

                                }}
                                onShoppingCartClear={() => {
                                    dispatch(clearShoppingCartItem({
                                        jwt, 
                                        itemIds: shoppingCartItems.map(s => s.id)
                                    }))
                                }}
                            />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    );
    };