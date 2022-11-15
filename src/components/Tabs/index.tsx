import { Tabs, TabsProps, Typography, Modal } from "antd";
import React, { ReactNode, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Title = Typography.Title;

const { confirm } = Modal;

export type Items = TabsProps["items"];

export const NTabs: React.FC<Tabs> = ({
  title,
  items: _items,
  enableEdit = true,
  onChange,
  addTab,
  onEdit,
  confirm: _confirm,
}) => {
  const [items, setItems] = useState(_items);
  const [activeKey, setActiveKey] = useState<string>(items![0].key);

  const { title: _title, icon, onOk, content, onCancel } = _confirm ?? {};

  const type = enableEdit ? "editable-card" : "card";

  const handleChange = () => {
    onChange && onChange(activeKey, items);
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

  const add = () => {
    setItems((pre) => {
      const tab = addTab();
      const { children: child, label, key } = tab;
      return [...(pre ?? []), { key: String(key), label: label, children: child }];
    });
  };

  const handleEdit = (targetKey: any, action: "add" | "remove") => {
    if (action === "add") {
      add();
    } else {
      if (!_confirm) {
        confirm({
          title: _title ?? "确认删除吗?",
          icon: icon ?? <ExclamationCircleOutlined />,
          content: content ?? "",
          onOk() {
            remove(targetKey);
            onOk && onOk();
          },
          onCancel() {
            onCancel && onCancel();
          },
        });
      } else {
        remove(targetKey);
        onOk && onOk();
      }
    }
    onEdit && onEdit(targetKey, action);
  };

  return (
    <>
      {title ? <Title level={5}>{title}</Title> : null}
      <Tabs type={type} items={items} onEdit={handleEdit} onChange={handleChange} />
    </>
  );
};

export type Tabs = {
  title?: string;
  items: Items;
  enableEdit?: boolean;
  onChange?: (key: string, items: Items) => void;
  children?: ReactNode;
  onEdit?: (key: string, action: "add" | "remove") => void;
  addTab: () => { label: string; key: string | number; children: ReactNode };
  confirm?: {
    title?: string;
    icon?: ReactNode;
    content?: string;
    onOk?: () => void;
    onCancel?: () => void;
  };
};
