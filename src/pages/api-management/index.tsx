import Input from "antd/lib/input/Input";
import React from "react";
import { SearchOutlined, PlusOutlined, AppstoreOutlined, ApiOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { Allotment } from "allotment";
import { NButton } from "@/components";
import { TreeView } from "./TreeView";
import { MainContent } from "./MainContent";
import { RequestRecordProvider } from "@/store";
import "allotment/dist/style.css";
import { InputWrap, Label, Wrap } from "./style";
import { I18n } from "@/components/FormattedMessage";

const inputStyle = { width: `calc(100% - 40px)`, marginRight: 8 };

export const APIManagement: React.FC = () => {
  return (
    <RequestRecordProvider>
      <Allotment>
        <Allotment.Pane preferredSize={240}>
          <Wrap>
            <InputWrap>
              <Input prefix={<SearchOutlined />} style={inputStyle} />
              <Button type="primary" icon={<PlusOutlined />}></Button>
            </InputWrap>
            <NButton icon={<AppstoreOutlined style={{ marginRight: 6 }} />} label="项目概览" />
            <TreeView />
          </Wrap>
        </Allotment.Pane>
        <Allotment.Pane>
          <MainContent />
        </Allotment.Pane>
      </Allotment>
    </RequestRecordProvider>
  );
};

const iconStyle = {
  color: "var(--primary-color)",
};

const primaryMenus = {
  items: [
    {
      label: (
        <Label>
          <I18n id="newApi" />
        </Label>
      ),
      key: "item-1",
      icon: <ApiOutlined style={iconStyle} />,
    },
    {
      label: (
        <Label>
          <I18n id="newFastRequest" />
        </Label>
      ),
      key: "item-2",
      icon: <SendOutlined style={iconStyle} />,
    },
    // {
    //   label: (
    //     <Label>
    //       <I18n id="newFastRequest" />
    //     </Label>
    //   ),
    //   key: "item-3",
    //   icon: <CodepenOutlined style={iconStyle} />,
    // },
  ],
  onClick: (key: any) => {
    // console.log(key);
  },
};

export const APINavList = () => {
  return (
    <div className="demo">
      <InputWrap>
        <Input prefix={<SearchOutlined />} style={inputStyle} />
        <Dropdown menu={primaryMenus}>
          <Button type="primary" icon={<PlusOutlined />}></Button>
        </Dropdown>
      </InputWrap>
      <div>
        <NButton icon={<AppstoreOutlined style={{ marginRight: 6 }} />} label={<I18n id="overview" />} />
        <TreeView />
      </div>
    </div>
  );
};

export const APIContent = () => {
  return <MainContent />;
};

export default {
  list: APINavList,
  content: APIContent,
};
