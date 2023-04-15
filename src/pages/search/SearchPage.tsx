import styles from './SearchPage.module.css';
import React, { useEffect } from 'react';
import { Header, Footer, FilterArea, ProductList } from '../../components';
import { useParams, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { searchProduct } from '../../redux/ProductSearch/slice';
import { useAppDispatch, useSelector } from '../../redux/hooks';
import { MainLayout } from '../../layouts/mainLayout';

type MatchParams = {
    keywords: string;
};

export const SearchPage: React.FC = () => {
    const {keywords} = useParams<MatchParams>();
    const loading = useSelector(state => state.productSearch.loading);
    const error = useSelector(state => state.productSearch.error);
    const pagination = useSelector(state => state.productSearch.pagination);
    const productList = useSelector(state => state.productSearch.data);

    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        if (keywords){
            dispatch(searchProduct({nextPage: 1, pageSize:10, keywords: keywords}))
        }else{
            dispatch(searchProduct({nextPage: 1, pageSize:10, keywords: ''}))
        }
    }, [location]);

    const handlePageChange = (nextPage: number, pageSize: number) => { 
        if (keywords){
            dispatch(searchProduct({nextPage, pageSize, keywords: keywords}))
        }else{
            dispatch(searchProduct({nextPage, pageSize, keywords: ''}))
        }
    }
    if (loading) {
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
                {/* 分类过滤器 */}
                    <div className={styles['product-list-container']} >
                        <FilterArea />
                    </div>
                {/* 产品列表 */}
                    <div className={styles['product-list-container']} >
                        <ProductList 
                        data={productList}
                        paging={pagination}
                        onPageChange={handlePageChange}
                        />
                    </div>
        </ MainLayout>
    );
};