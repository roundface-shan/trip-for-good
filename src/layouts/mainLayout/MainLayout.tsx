import React from "react";
import styles from './MainLayout.module.css';
import { Header, Footer } from "../../components";

interface MainLayoutProps {
    children: React.ReactNode,
}

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
    return (
        <>
        <Header />
            <div className={styles['page-content']}>
                {props.children}
            </div>
        <Footer />
        </>
        
    )
}