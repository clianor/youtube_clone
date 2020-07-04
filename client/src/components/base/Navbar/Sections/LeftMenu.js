import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;

export default function LeftMenu(props) {
  return (
    <Menu mode={props.mode} onSelect={() => {}}>
      <MenuItem key="home">
        <Link to="/">Home</Link>
      </MenuItem>
      <SubMenu title={<span>Blogs</span>}>
        <MenuItemGroup title="Item 1">
          <MenuItem key="setting:1">Option 1</MenuItem>
          <MenuItem key="setting:2">Option 2</MenuItem>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <MenuItem key="setting:3">Option 4</MenuItem>
          <MenuItem key="setting:4">Option 3</MenuItem>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
}
