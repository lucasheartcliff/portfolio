import { Layout, Menu } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  background: #ddd;
`;

export const Header = styled(Layout.Header)`
  padding: 0 10px;
  background: #fff;
  position: fixed;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &.ant-layout-header {
    padding: 0 10px;
  }

  ul.ant-menu {
    border: 0;
    line-height: 46px;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  span {
    margin: 0 5px;
  }
`;

export const Content = styled(Layout.Content)`
  margin-top: 64px;
  height: calc(100vh - 64px);
  padding: 10px;
  transition: all 0.2s ease-in-out;
  width: 100vw;
`;
