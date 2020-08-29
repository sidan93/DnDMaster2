import React from "react";
import {
  Button,
  Drawer,
  message,
  Spin,
  Form,
  Select,
  Input
} from "antd";
import MagicSchool from "../../../const/magic_school";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 30,
  },
};

class EditSpell extends React.Component {
  form = React.createRef();

  static getDerivedStateFromProps(nextProps) {
    return {
      visible : nextProps.isOpen,
      record: nextProps.currentRecord,
    };
  }

  state = {
    visible: false,
    sending: false,
    record: null
  };

  async onClose(isOk) {
    if (this.state.sending) {
      message.warning({
        duration: 0.5,
        content: 'Дождитесь заверешния операции'
      })
      return;
    }

    if (!isOk) {
      return this.props.onCloseEdit();
    }

    if (!await this.form.current.validateFields())
      return;

    this.setState({ sending: true });
    setTimeout(() => {
      this.setState({ sending: false }, this.props.onCloseEdit);
      message.success('Заклинание добавлено');
      console.log('getFieldsValue', this.form.current.getFieldsValue());
    }, 30);

  }

  render() {
    return (
      <div>
        <Drawer
          destroyOnClose
          title="Vertically centered modal dialog"
          onClose={() => this.onClose(false)}
          visible={this.state.visible}
          width="50vw"
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={() => this.onClose(false)} style={{marginRight: 8}}>
                Отмена
              </Button>
              <Button onClick={() => this.onClose(true)} type="primary">
                Ок
              </Button>
            </div>
          }
        >
          <Spin spinning={this.state.sending}>
            <Form
              ref={this.form}
              name="edit_spell"
              {...layout}
            >
              <Form.Item
                name="title"
                label="Название"
                rules={[{
                  required: true,
                  message: 'Необходимо ввести название заклинания',
                }]}
                initialValue={this.state.record?.name}
              >
                <Input placeholder="Название заклинания"/>
              </Form.Item>
              <Form.Item
                name="school"
                label="Школа магии"
                rules={[{
                  required: true,
                  message: 'Необходимо выбрать школу заклинания',
                  type: "array"
                }]}
                initialValue={this.state.record?.school}
              >
                <Select mode="multiple" placeholder="Выберите школу магии">
                  {Object.values(MagicSchool).map((item) => (
                    <Select.Option key={item.key} value={item.key}>{item.title}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="description"
                label="Описание"
                initialValue={this.state.record?.description}
              >
                <Input.TextArea/>
              </Form.Item>
            </Form>
          </Spin>
        </Drawer>
      </div>
    );
  }
}

export default EditSpell;