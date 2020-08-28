import React from "react";
import { Layout, Menu } from "antd";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const { Content } = Layout;

export default class App extends React.Component {

  items = [
    {
      url: "/",
      nav_title: "Option 1",
      content: "Option 1"
    },
    {
      url: "/second",
      nav_title: "Option 2",
      content: "Option 2"
    },
    {
      url: "/three",
      nav_title: "Option 3",
      content: "Option 3"
    }
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
                <Menu.Item key={item.url}>
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
