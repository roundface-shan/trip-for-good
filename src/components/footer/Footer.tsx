import React from "react";
import { Layout, Typography } from "antd";


export const Footer: React.FC = () => {
    return (
        <Layout.Footer>
            <Typography.Title level={5} style={{color: 'grey', textAlign:'center'}}>
                @2023 React旅游网 All Rights Reserved
            </Typography.Title>
        </Layout.Footer>
    )
}

export default Footer;