import React from "react";
import {Table, PageHeader, Button} from "antd";
import {EditOutlined} from "@ant-design/icons"
import EditSpell from "./edit/edit";
import MagicSchool from "../../const/magic_school";

class SpellBook extends React.Component {

  state = {
    edit: React.createRef()
  }

  render() {
    const dataSource = [
      {
        key: '1',
        name: 'Телепортация',
        subname: 'Очень длинная',
        level: 4,
        type: 'Особое',
        school: ['water', 'fire'],
        description: 'Кол-во = 4цели = 1 + 2 + 3 Дальность = 720футов = (3+6+9)*4*10'
      }
    ];

    const columns = [
      {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Подназвание',
        dataIndex: 'subname',
        key: 'subname',
      },
      {
        title: 'Уровень',
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: 'Тин',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Школа',
        dataIndex: 'school',
        render: (text, record) => record.school?.map(i => MagicSchool[i]?.title).join(', ')
      },
      {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => {
          return (
            <Button
              icon={<EditOutlined />}
              onClick={() => this.state.edit.current.show(record)}
            />
          );
        }
      }
    ];
    return (
      <div>
        <PageHeader
          title="Книга заклинаний"
          extra={[
            <Button
              key="1"
              type="primary"
              onClick={() => {this.state.edit.current.show()}}
            >Добавить</Button>
          ]}
        />
        <Table dataSource={dataSource} columns={columns} />
        <EditSpell ref={this.state.edit}/>
      </div>
    )
  }
}

export default SpellBook;