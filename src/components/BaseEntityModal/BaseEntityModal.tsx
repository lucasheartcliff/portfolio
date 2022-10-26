import React, { ReactElement } from 'react';

import { Button, Spin } from 'antd';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';
import Modal, { ModalProps } from 'antd/lib/modal/Modal';
import { CSSObject } from 'styled-components';

interface Props<T = any> extends ModalProps {
  entity?: any;
  visible: boolean;
  entityName: string;
  form: FormInstance<T>;
  width?: number;
  loading?: boolean;
  hideModal: () => void;
  onSubmit: (form: FormInstance) => void;
  children?: any;
  style?: CSSObject;
}
const BaseEntityModal = <T extends any>({
  entity,
  width,
  entityName,
  onSubmit,
  visible,
  children,
  hideModal,
  loading,
  form,
  style,
  ...props
}: Props<T>) => {
  return (
    <Modal
      {...props}
      visible={visible}
      width={width || 800}
      destroyOnClose
      title={!entity ? `Criar ${entityName}` : `Editar ${entityName}`}
      style={style}
      maskClosable={false}
      onCancel={hideModal}
      footer={[
        <Button
          key="submit"
          type="primary"
          htmlType={'submit'}
          onClick={() => onSubmit(form)}
        >
          {'Salvar'}
        </Button>,
      ]}
    >
      <Spin spinning={!!loading}>
        <Form initialValues={entity as Store} layout={'vertical'} form={form}>
          {children}
        </Form>
      </Spin>
    </Modal>
  );
};

export default BaseEntityModal;
