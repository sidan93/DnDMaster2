import React from "react";
import {Button, Drawer, message, Spin} from "antd";

class EditSpell extends React.Component {
  state = {
    visible: false,
    sending: false
  };

  show() {
    this.setVisible(true);
  }

  setVisible(visible) {
    this.setState({visible});
  }

  onClose() {
    if (this.state.sending) {
      message.warning({
        duration: 0.5,
        content: 'Дождитесь заверешния операции'
      })
      return;
    }

    this.setState({sending: true});
    setTimeout(() => {
      this.setState({sending: false});
      this.setVisible(false);
      message.success('Заклинание добавлено')
    }, 3000);
  }

  render() {
    return (
      <div>
        <Drawer
          title="Vertically centered modal dialog"
          visible={this.state.visible}
          onClose={this.onClose.bind(this)}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose.bind(this)} style={{ marginRight: 8 }}>
                Отмена
              </Button>
              <Button onClick={this.onClose.bind(this)} type="primary">
                Ок
              </Button>
            </div>
          }
        >
          <Spin spinning={this.state.sending}>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
          </Spin>
        </Drawer>
      </div>
    );
  }
}

export default EditSpell;