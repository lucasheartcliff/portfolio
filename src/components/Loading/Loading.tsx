import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';

import * as S from './styled';

interface Props extends SpinProps {}

const Loading: React.FC<Props> = props => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <S.Container>
      <Spin indicator={antIcon} {...props} />
    </S.Container>
  );
};

export default Loading;
