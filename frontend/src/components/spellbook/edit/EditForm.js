import React, {useState, useEffect} from 'react';
import {Form, Button, Input, Spin, Select, Drawer, message} from 'antd';
import MagicSchool from "../../../const/magic_school";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 30,
  },
};

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const EditForm = (props) => {
  /** Работает как this.state.isSending, по умолчанию false,
    * изменяется при setSending(true),
    * сбрасыввается при destroy копонента
    */
  const [isSending, setSending] = useState(false);
  const [form] = Form.useForm(); // Инстанс формы передает данные через form={form}

  /** Вызывается при изменении ссылки props.record,
    * props.record -- передавали через родителя
    */
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(props.record); // заполняет инстанс раннее созданой формы формы
  }, [props.record])

  const onSubmit = () => {
    if (isSending) {
      message.warning({
        duration: 0.5,
        content: 'Дождитесь заверешния операции'
      });
      return;
    }
    setSending(true);
    form.submit();
  }

  const onFinish = async (values) => {
    await delay(5*1000);

    setSending(false);
    message.success('Заклинание добавлено');
    console.log('Success:', values);
    props.onCloseEdit();
  };

  const onFinishFailed = errorInfo => {
    setSending(false);
    console.log('Failed:', errorInfo);
  };

  const DrawerFooter = () => (
    <div style={{ textAlign: 'right' }}>
      <Button onClick={props.onCloseEdit} style={{ marginRight: 8 }}>
        Отмена
      </Button>
      <Button onClick={onSubmit} type="primary">
        Ок
      </Button>
    </div>
  );

  return (
    <Drawer
      forceRender
      destroyOnClose
      width="50vw"
      placement="right"
      title="Basic Drawer"
      onClose={props.onCloseEdit}
      visible={props.isOpen}
      footer={<DrawerFooter />}
    >
      <Spin spinning={isSending}>
        <Form
          {...layout}
          form={form} // инстанс формы
          name="edit_spell"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name" // initialValues не нужен, нстанс формы понимает что за поле по имени
            label="Название"
            rules={[{
              required: true,
              message: 'Необходимо ввести название заклинания',
            }]}
          >
            <Input placeholder="Название заклинания"/>
          </Form.Item>
          <Form.Item
            name="school"
            label="Школа магии"
            rules={[{
              type: "array",
              required: true,
              message: 'Необходимо выбрать школу заклинания',
            }]}
          >
            <Select mode="multiple" placeholder="Выберите школу магии">
              {Object.values(MagicSchool).map((item) => (
                <Select.Option key={item.key} value={item.key}>{item.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
}

export default EditForm;