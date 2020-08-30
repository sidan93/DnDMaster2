import React from "react";
import {Table, PageHeader, Button} from "antd";
import {EditOutlined} from "@ant-design/icons"
import EditSpell from "./edit/edit";
import EditSpellDrawer from "./edit/EditForm";
import MagicSchool from "../../const/magic_school";

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

const dataColumns =  [{
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Подназвание',
    dataIndex: 'subname',
    key: 'subname',
  }, {
    title: 'Уровень',
    dataIndex: 'level',
    key: 'level',
  }, {
    title: 'Тин',
    dataIndex: 'type',
    key: 'type',
  }
  ];

class SpellBook extends React.Component {

  state = {
    columns: [],
    showEdit: false,
    currentRecord: null,
  }

  componentDidMount() {
    this.setState({
      columns: [
        ...dataColumns,
        {
          title: 'Школа',
          dataIndex: 'school',
          render: this.renderSchoolCell,
        }, {
          title: 'Описание',
          dataIndex: 'description',
          key: 'description',
        }, {
          title: '',
          key: 'actionEdit',
          render: this.renderEditButton,
        }],
    })
  }

  toggleOpenEdit = () =>
    this.setState(({ showEdit,}) => ({
      showEdit: !showEdit,
      currentRecord: null
    }));

  onOpenEditRecord = (record) => this.setState({
    showEdit: true,
    currentRecord: record,
  });

  renderEditButton = (text, record) => (
    <Button
      icon={<EditOutlined />}
      onClick={() => this.onOpenEditRecord(record)}
    />
  );

  renderSchoolCell = (text, record) => record
    .school?.map(i => MagicSchool[i]?.title).join(', ');

  render() {
    const { columns, showEdit, currentRecord } = this.state;

    return (
      <div>
        <PageHeader
          title="Книга заклинаний"
          extra={[
            <Button
              key="1"
              type="primary"
              onClick={this.toggleOpenEdit}
            >
              Добавить
            </Button>
          ]}
        />
        <Table dataSource={dataSource} columns={columns} />

        {/*<EditSpell*/}
        {/*  isOpen={showEdit}*/}
        {/*  currentRecord={currentRecord}*/}
        {/*  onCloseEdit={this.toggleOpenEdit}*/}
        {/*/>*/}

        <EditSpellDrawer
          isOpen={showEdit}
          record={currentRecord}
          onCloseEdit={this.toggleOpenEdit}
        />
      </div>
    )
  }
}

export default SpellBook;