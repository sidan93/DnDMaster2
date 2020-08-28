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

class EditSpell extends React.Component {
  state = {
    visible: false,
    sending: false,
    form: React.createRef(),
    record: null
  };

  layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 30,
    },
  };

  async setStateAsync(stateUpdate) {
    return new Promise(resolve => {
      this.setState(stateUpdate, () => resolve());
    });
  }

  async show(record) {
    await this.setStateAsync({record})

    if (this.state.form.current)
      this.state.form.current.resetFields();

    this.setVisible(true);
  }

  setVisible(visible) {
    this.setState({visible});
  }

  async onClose(isOk) {
    if (this.state.sending) {
      message.warning({
        duration: 0.5,
        content: 'Дождитесь заверешния операции'
      })
      return;
    }

    if (!isOk) {
      this.setVisible(false);
      return;
    }

    if (!await this.state.form.current.validateFields())
      return;

    this.setState({sending: true});
    setTimeout(() => {
      this.setState({sending: false});
      this.setVisible(false);
      message.success('Заклинание добавлено');
      console.log('getFieldsValue', this.state.form.current.getFieldsValue());
    }, 30);
  }

  render() {
    return (
      <div>
        <Drawer
          title="Vertically centered modal dialog"
          visible={this.state.visible}
          onClose={this.onClose.bind(this, false)}
          width="50vw"
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose.bind(this, false)} style={{marginRight: 8}}>
                Отмена
              </Button>
              <Button onClick={this.onClose.bind(this, true)} type="primary">
                Ок
              </Button>
            </div>
          }
        >
          <Spin spinning={this.state.sending}>
            <Form
              ref={this.state.form}
              name="edit_spell"
              {...this.layout}
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