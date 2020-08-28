import React from "react";

import {Layout, Menu} from "antd";
import "./App.css";
import SpellBook from "./components/spellbook/spellbook";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {BookOutlined, HomeOutlined} from "@ant-design/icons"

const { Content } = Layout;

export default class App extends React.Component {

  items = [
    {
      url: "/",
      nav_title: "Главная",
      icon: <HomeOutlined />,
      content: "Option 1"
    },
    {
      url: "/spellbook",
      nav_title: "Книга заклинаний",
      icon: <BookOutlined/>,
      content: <SpellBook/>
    },
  ];

  state = {
    selectedKeys: [window.location.pathname,]
  }

  render() {
    return (
      <Router>
        <Layout style={{minHeight: "100vh"}}>
          <Layout.Sider collapsible>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['/']}
              selectedKeys={this.state.selectedKeys}
              onClick={(item) => (
                this.setState({selectedKeys: item.keyPath})
              )}
            >
              {this.items.map((item) => (
                <Menu.Item
                  key={item.url}
                  icon={item.icon}
                >
                  <Link to={item.url}>{item.nav_title}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Layout.Sider>

          <Layout>
            <Content>
              <Switch>
                {this.items.map((item, index) => (
                  <Route key={item.url} exact={index===0} path={item.url}>
                    {item.content}
                  </Route>
                ))}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
