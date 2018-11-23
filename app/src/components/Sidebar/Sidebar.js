import React, { Component } from 'react';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';


const sidebar = () => {
    const items = [
        <SidebarItem>Dashboard</SidebarItem>,
        <SidebarItem>Profile</SidebarItem>,
        <SidebarItem>Settings</SidebarItem>,
    ];
        return (
            <Sidebar content={items}/>

        );
}

export default sidebar;
