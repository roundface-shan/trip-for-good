import React, {useState, useEffect} from "react";
import styles from "./Header.module.css";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";
import { addLanguageActionCreator, changeLanguageActionCreator } from "../../redux/language/languageActions";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { useTranslation } from 'react-i18next';
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { SignInSlice } from "../../redux/SignIn/slice";


interface JwtPayload extends DefaultJwtPayload {
  username: string
}

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const language = useSelector((state) => state.language.language)
  // 如果用useState从store里获得状态的话，需要用useEffect来监听store的变化, 写法上太麻烦
  const languageList = useSelector((state) => state.language.languageList)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const jwt = useSelector((state) => state.signIn.token)
  const [username, setUsername] = useState<string | null>(null)

  const shoppingCartItems = useSelector((state) => state.shoppingCart.items)
  const shoppingCartLoading = useSelector((state) => state.shoppingCart.loading)

  useEffect(() => {
    if(jwt !== null) {
      const token = jwt_decode<JwtPayload>(jwt)
      setUsername(token.username)
    }
  }, [jwt])
  
  const handleMenuClick = (e: MenuInfo) => {
    if (e.key === 'new') {
      dispatch(addLanguageActionCreator('新语言', 'new_lang'))
    } else {
      dispatch(changeLanguageActionCreator(e.key))
    }
  }
  
  const onSignOut = () => {
    dispatch(SignInSlice.actions.signOut())
    navigate('/')
  }

  return (
        <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          <Dropdown.Button style={{marginLeft: 15, display: 'inline'}} 
          menu={
            {items: [
              ...languageList.map((l) => {
                return { key: l.code, label: l.name };
              }),
              { key: "new", label: t("header.add_new_language") }
            ],
            onClick: handleMenuClick
            }
          }
          icon={<GlobalOutlined />}
          >
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
          {jwt ? (
            <Button.Group className={styles['button-group']}>
              <span style={{marginRight: 15}}>{t('header.welcome')}
                <Typography.Text strong>{username}</Typography.Text>
              </span>
              <Button 
              loading={shoppingCartLoading} 
              onClick={() => navigate('/shoppingCart')}
              >
                {t('header.shoppingCart')}({shoppingCartItems.length})
              </Button>
              <Button onClick={onSignOut}>{t("header.signOut")}</Button>
            </Button.Group>
            ) : (
                <Button.Group className={styles['button-group']}>
                  <Button onClick={() => navigate('/register')}>{t("header.register")}</Button>
                  <Button onClick={() => navigate('/signin')}>{t("header.signin")}</Button>
                </Button.Group>
                )
          }
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={() => navigate('/')}>
            <img src={logo} alt="logo" className={styles['App-logo']}/>
            <Typography.Title level={3} className={styles.title}>
              {t("header.title")}
            </Typography.Title>
          </span>
          <Input.Search 
          placeholder="请输入旅游目的地、主题、或关键字" 
          className={styles['search-input']}
          onSearch={(keyward) => navigate("/search/"+keyward)}
          />
        </Layout.Header>
        <Menu mode={'horizontal'}
          items={[
            { key: "1", label: t("header.home_page") },
            { key: "2", label: t("header.weekend") },
            { key: "3", label: t("header.group") },
            { key: "4", label: t("header.backpack") },
            { key: "5", label: t("header.private") },
            { key: "6", label: t("header.cruise") },
            { key: "7", label: t("header.hotel") },
            { key: "8", label: t("header.local") },
            { key: "9", label: t("header.theme") },
            { key: "10", label: t("header.custom") },
            { key: "11", label: t("header.study") },
            { key: "12", label: t("header.visa") },
            { key: "13", label: t("header.enterprise") },
            { key: "14", label: t("header.high_end") },
            { key: "15", label: t("header.outdoor") },
            { key: "16", label: t("header.insurance") },
        ]}
          className={styles['main-menu']}
        >
        </Menu>
      </div>
    )
}

export default Header;
