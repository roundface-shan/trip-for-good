import React from "react";
import {Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartners} from '../../components';
import {Row, Col, Typography, Spin} from 'antd';
import styles from './HomePage.module.css';
import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import { withTranslation, WithTranslation } from "react-i18next";
import axios from "axios";
import { connect } from 'react-redux';
import { RootState } from "../../redux/store";
import { 
    showMeYourDataCreator
 } from "../../redux/recommendProducts/recommendProductsActions";
 import { MainLayout } from "../../layouts/mainLayout";

 const mapDispatchToProps = (dispatch) => {
    return {
        showMeYourData: () => {
            dispatch(showMeYourDataCreator())
        }
    }
}

// 把相关状态从store里取出来
const mapStateToProps = (state: RootState) => {
    return {
        isLoading: state.recommendProducts.isLoading,
        error: state.recommendProducts.error,
        productList: state.recommendProducts.productList,
    }
}

type PropsType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & WithTranslation;
class HomePageComponent extends React.Component <PropsType>{
    componentDidMount(): void{
        this.props.showMeYourData()
    }

    render(): React.ReactNode {
        const { t, productList, isLoading, error } = this.props;
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
        // console.log(productList[0].touristRoutes)
        if (error) {
            return <div>{error}</div>
        }
        return (
            <MainLayout>
                    <Row style={{marginTop: 20}}>
                    <Col span={6}>
                        <SideMenu />
                    </Col>
                    <Col span={18}>
                        <Carousel />
                    </Col>
                    </Row>
                    <ProductCollection
                    title={
                        <Typography.Title level={3} type='warning'>
                            {t('home_page.hot_recommended')}
                        </Typography.Title>}
                    sideImage={sideImage}
                    products={productList[0].touristRoutes}
                    /> 
                    <ProductCollection
                    title={
                        <Typography.Title level={3} type='danger'>
                            {t('home_page.new_arrival')}
                        </Typography.Title>}
                    sideImage={sideImage2}
                    products={productList[1].touristRoutes}
                    />
                    <ProductCollection
                    title={
                        <Typography.Title level={3} type='success'>
                            {t('home_page.domestic_travel')}
                        </Typography.Title>}
                    sideImage={sideImage3}
                    products={productList[2].touristRoutes}
                    />
                    <BusinessPartners />
            </ MainLayout>
        );
    }
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));