import React from "react";
import { Layout, Typography } from "antd";
import { useTranslation } from "react-i18next";


export const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Layout.Footer>
            <Typography.Title level={5} style={{color: 'grey', textAlign:'center'}}>
                {t('footer.detail')}
            </Typography.Title>
        </Layout.Footer>
    )
}

export default Footer;