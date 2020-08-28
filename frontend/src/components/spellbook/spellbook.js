import React from "react";
import {Table} from "antd";


class SpellBook extends React.Component {

  render() {
    const dataSource = [
      {
        key: '1',
        name: 'Телепортация',
        subname: 'Очень длинная',
        level: 4,
        type: 'Особое',
        school: 'Вода',
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
        key: 'school',
      },
      {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
      },
    ];
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    )
  }
}

export default SpellBook;