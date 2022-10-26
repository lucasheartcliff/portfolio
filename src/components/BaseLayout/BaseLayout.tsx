import {
  CaretDownOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import React, { FC, ReactElement, useContext, useState } from "react";
import Logo from "../logo";

import { Container, Content, Header, UserContainer } from "./styled";

const { SubMenu } = Menu;
const { Sider } = Layout;

const UserTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <UserContainer>
      <UserOutlined />
      {title}
      <CaretDownOutlined style={{ fontSize: 10 }} />
    </UserContainer>
  );
};

interface Props {
  children?: ReactElement;
}

const BaseLayout: FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toogleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const LOGO_NAME = "LucasHeartcliff";

  // const onSelectRoute = (path: string) => {
  //   history.push(path);
  // };

  const renderMenuItem = (props: MenuItemProps) => {
    return <Menu.Item {...props}>{props.title}</Menu.Item>;
  };
  const headerOptions = [
    {
      label: "Skills",
      key: "skills",
    },
  ];

  return (
    <Container>
      <FontAwesomeIcon icon={["far", "moon"]} />
      <Header>
        <Logo title={LOGO_NAME} />
        <Menu mode="horizontal">
          {headerOptions.map((header) => (
            <Menu.Item key={header.key}>{header.label}</Menu.Item>
          ))}

          <Menu.Item onClick={undefined}>
            <i className={"far fa-moon"} />
          </Menu.Item>
        </Menu>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default BaseLayout;
