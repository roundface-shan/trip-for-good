import React from 'react';
import styles from './SideMenu.module.css';
import {sideMenuList} from './mockup';
import {Menu} from 'antd';
import {GiftOutlined, MailOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons';

export const SideMenu: React.FC = () => {
    return (
        <Menu mode={'vertical'} className={styles['side-menu']}
            items={sideMenuList.map((m) => ({label: m.title, icon: <GiftOutlined/>, 
            key: m.title,
            children: m.subMenu.map((sm) => ({
                label: sm.title, 
                key: sm.title, 
                icon: <GiftOutlined/>,
                children: sm.subMenu.map((sms) => ({
                    label: sms,
                    key: sms,
                    icon: <GiftOutlined/>,
                })),
            })),
        }))}
        ></Menu>
    )
}