import { Tabs } from "antd";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { NewView } from "../NewView";
import { AddTabEvent, useEvent } from "@/hooks/use-event";
import { RequestView } from "../RequetView";
import { getId } from "@/utils";
import { NewApiView } from "../NewApiView";
import { TreeNode } from "@/type";
import type { TabsProps } from "antd";

const MainContentWrap = styled.div`
  width: 100%;
  height: 100%;
`;

type TabIemType = {
  icon: any;
  title: string;
  id: string;
  children: any;
};

const transform = (items: any[]) => {
  return items.map((tab) => {
    const { icon: Icon, id: key, title, children } = tab;
    return {
      label: (
        <span>
          <Icon />
          {title}
        </span>
      ),
      key,
      children,
    };
  });
};

export type Tab = {};

export const MainContent: React.FC = () => {
  const [items, setItems] = useState<TabsProps["items"]>([{ label: "New Tab", children: <NewView />, key: getId() }]);
  const [activeKey, setActiveKey] = useState<string>(items?.at(0)?.key ?? "0");

  const handleAddTab = (tab: TreeNode) => {
    setItems((pre) => {
      const find = (pre ?? []).find((item) => item.key === tab.id);
      if (find) {
        setActiveKey(find.key);
        return pre;
      } else {
        const newPanes = [...(pre ?? [])];
        const { id: key, title } = tab;
        const _title = title as string;
        newPanes.push({ ...tab, key: key!, label: _title, children: <RequestView /> });
        setActiveKey(key!);
        return newPanes;
      }
    });
  };

  const handleNewApi = () => {
    add(<NewApiView />);
  };

  useEvent([
    {
      event: "addTab",
      handler: handleAddTab,
    },
    {
      event: "newApi",
      handler: handleNewApi,
    },
  ]);

  const add = (view: JSX.Element) => {
    const newActiveKey = getId();
    setItems((pre) => {
      const pane = { label: "New Tab", children: view, key: newActiveKey };
      return [...(pre ?? []), pane];
    });
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items?.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items?.filter((item) => item.key !== targetKey) ?? [];
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const handleEdit = (targetKey: any, action: "add" | "remove") => {
    if (action === "add") {
      add(<NewView />);
    } else {
      remove(targetKey);
    }
  };
  const handleChange = (key: string) => {
    setActiveKey(key);
  };
  return (
    <MainContentWrap>
      <Tabs type="editable-card" activeKey={activeKey} onChange={handleChange} items={items} onEdit={handleEdit} />
    </MainContentWrap>
  );
};
