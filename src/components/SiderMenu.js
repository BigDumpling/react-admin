import React from 'react';
import {Icon, Menu} from 'antd';
import {Link} from 'react-router-dom';

const renderMenuItem =
    ({id, url, name, icon, link, ...props}) =>
        <Menu.Item
            key={id}
            {...props}
        >
            <Link to={link || url}>
                {icon && <Icon type={icon}/>}
                <span className="nav-text">{name}</span>
            </Link>
        </Menu.Item>;

const renderSubMenu =
    ({id, url, name, icon, link, subMenus, ...props}) =>
        <Menu.SubMenu
            key={id}
            title={
                <span>
                    {icon && <Icon type={icon}/>}
                    <span className="nav-text">{name}</span>
                </span>
            }
            {...props}
        >
            {subMenus && subMenus.map(item => renderMenuItem(item))}
        </Menu.SubMenu>;

export default ({menus, ...props}) => <Menu {...props}>
    {menus && menus.map(
        item => item.subMenus && item.subMenus.length > 0 ?
            renderSubMenu(item) : renderMenuItem(item)
    )}
</Menu>;