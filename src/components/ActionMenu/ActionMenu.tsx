import React from 'react';

import { CopyOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

interface Props {
  clone?: () => void;
  remove: () => void;
}
const ActionsMenu: React.FC<Props> = ({ clone, remove }) => {
  return (
    <Menu>
      {clone && (
        <Menu.Item key="0" onClick={clone}>
          <CopyOutlined />
          {' Clonar'}
        </Menu.Item>
      )}

      <Menu.Item key="1" onClick={remove}>
        <MinusCircleOutlined />
        {' Remover'}
      </Menu.Item>
    </Menu>
  );
};
export default ActionsMenu;
