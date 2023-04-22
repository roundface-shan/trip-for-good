import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col, DatePicker, Space, Divider, Typography, Anchor, Menu, Button } from "antd";
import styles from './DetailPage.module.css'
import {Header, Footer, ProductIntro} from '../../components'
import { productDetailSlice, getProductDetail } from "../../redux/productDetail/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layouts/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";

const { RangePicker } = DatePicker;

type MatchParams = {
    touristRouteId: string,
}

export const DetailPage: React.FC = () => {
    const { touristRouteId } = useParams<MatchParams>()
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<any>(null);
    // const [product, setProduct] = useState<any>(null);

    const dispatch = useAppDispatch()
    const isLoading = useSelector((state) => state.productDetail.isLoading);
    const error = useSelector((state) => state.productDetail.error);
    const product = useSelector((state) => state.productDetail.product);

    const jwt = useSelector((state) => state.signIn.token) as string
    const shoppingCartLoading = useSelector((state) => state.shoppingCart.loading)

    useEffect(() => {
          if (touristRouteId){
            dispatch(getProductDetail(touristRouteId))
          }
        }, [])
        if (isLoading) {
          return (<Spin
              size='large'
              style={{
                  marginTop: 200,
                  marginBottom:200,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '100%',
              }}
          />)
      }
      if (error) {
          return <div>{error}</div>
      }

  const handleClickAddShoppingCart = () => {
    if (jwt === null) {
      alert('请先登录')
      return
    }
    dispatch(addShoppingCartItem({jwt, touristRouteId: product.id}))
  }

  return (
    <MainLayout>
    {/* {console.log(product)} */}
          <div className={styles['product-intro-container']}>
            <Row>
              <Col span={13}>
                <ProductIntro 
                  title={product.title}
                  shortDescription={product.description}
                  price={product.originalPrice}
                  coupons={product.coupons}
                  points={product.points}
                  discount={product.price}
                  rating={product.rating}
                  pictures={product.touristRoutePictures.map((p) => p.url)}
                />
              </Col>
              <Col span={11}>
                <Button
                  style={{marginTop: 50, marginBottom: 30, display: 'block'}}
                  type='primary'
                  danger
                  loading={shoppingCartLoading}
                  onClick={() => {
                    dispatch(
                      addShoppingCartItem({ jwt, touristRouteId: product.id })
                    );
                  }}
                >
                  <ShoppingCartOutlined />
                  加入购物车
                </Button>
                <RangePicker style={{marginTop: 20}}/>
              </Col>
            </Row>
          </div>
          <Anchor className={styles['product-detail-anchor']}>
            <Menu mode='horizontal'>
              <Menu.Item key="1">
                <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Anchor.Link href="#fees" title="费用"></Anchor.Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
              </Menu.Item>
            </Menu>
          </Anchor>
          <div id='feature' className={styles['product-detail-container']}>
            <Divider orientation="center">
              <Typography.Title level={3}>产品特色</Typography.Title>
            </Divider>
            <div dangerouslySetInnerHTML={{__html: product.features}}
            style={{margin: 50}}></div>
          </div>
          <div id='fees' className={styles['product-detail-container']}>
          <Divider orientation="center">
              <Typography.Title level={3}>费用</Typography.Title>
            </Divider>
            <div dangerouslySetInnerHTML={{__html: product.fees}}
            style={{margin: 50}}></div>
          </div>
          <div id='notes' className={styles['product-detail-container']}>
          <Divider orientation="center">
              <Typography.Title level={3}>预订须知</Typography.Title>
            </Divider>
            <div dangerouslySetInnerHTML={{__html: product.notes}}
            style={{margin: 50}}></div>
          </div>
    </MainLayout>
    
  );
};
