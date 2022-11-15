import React, { memo, ReactElement, useCallback, useEffect, useState } from "react";
import { Dropdown, Tree } from "antd";
import type { MenuProps, TreeProps } from "antd";
import styled from "@emotion/styled";
import {
  ApiOutlined,
  CodepenOutlined,
  DownOutlined,
  EllipsisOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  MoneyCollectOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useEvent } from "@/hooks/use-event";
import { ApiRequest, TreeNode, TreeNodeType } from "@/type";
import { eve } from "@/hooks/use-event";
import { MenuClickEventHandler } from "@/components/Menu";
import { useRequestRecord } from "@/store";
import { I18n } from "@/components/FormattedMessage";
import { useTranslation } from "react-i18next";

const TextWrap = styled.span`
  font-size: 12px;
  margin-right: 4px;
  position: relative;
  left: -11px;
`;

const colors = {
  get: "#41CA9D",
  post: "#ED8936",
  put: "#1890FF",
  delete: "#F385C2",
  default: null,
};

type ColorKey = keyof typeof colors;

type TitleIconProps = {
  icon: ColorKey | ReactElement;
};

const TitleIcon = ({ icon }: TitleIconProps) => {
  if (React.isValidElement(icon)) {
    return icon;
  }
  return (
    <>{colors[icon] ? <TextWrap style={{ color: colors[icon] ?? undefined }}>{icon.toUpperCase()}</TextWrap> : null}</>
  );
};

const TreeIcon = (props: { selected: boolean; expanded: boolean; type?: ColorKey | "dir" }) => {
  const { selected, expanded, type } = props;

  if (type == "dir") {
    return selected || expanded ? <FolderOpenOutlined /> : <FolderOutlined />;
  }
  if (type && colors[type.toLowerCase() as ColorKey]) {
    return <TextWrap style={{ color: colors[type] ?? undefined }}>{(type as string).toUpperCase()}</TextWrap>;
  }
  return null;
};

const Icon = (type?: ColorKey | "dir") => (props: any) => <TreeIcon {...props} type={type} />;

const IconWrap = styled.span`
  height: 24px;
  line-height: 24px;
  float: right;
  padding-right: 8px;
  display: none;
  .anticon {
    vertical-align: middle;
  }
`;

export const MenuItemKey = {
  newApi: "newApi",
  newApiGroup: "newApiGroup",
  newFastRequest: "newFastRequest",
  newFastRequestGroup: "newGroup",
  newModel: "newModel",
  newModelGroup: "newModelGroup",
};

const apiMenuItems: MenuProps["items"] = [
  {
    key: MenuItemKey.newApi,
    label: <I18n id="newApi" />,
    icon: <ApiOutlined />,
  },
  {
    key: MenuItemKey.newApiGroup,
    label: <I18n id="newDir" />,
    icon: <FolderOutlined />,
  },
];

const requestMenuItems = [
  {
    key: MenuItemKey.newFastRequest,
    label: <I18n id="newFastRequest" />,
    icon: <SendOutlined />,
  },
  {
    key: MenuItemKey.newApiGroup,
    label: "新建分组",
    icon: <FolderOutlined />,
  },
];

const modelMenuItems = [
  {
    key: "1",
    label: "新建数据模型",
    icon: <CodepenOutlined />,
  },
  {
    key: "2",
    label: "新建分组",
    icon: <FolderOutlined />,
  },
];

const handleMap = {
  [MenuItemKey.newApi]: () => {
    eve.emit(MenuItemKey.newApi);
  },
};

const handleMenuClick: MenuClickEventHandler = (menu: { domEvent: any; key: any }) => {
  const { domEvent, key } = menu;
  domEvent.stopPropagation();
  handleMap[key]();
};

const menus: Record<TreeNodeType, MenuProps["items"]> = {
  api: apiMenuItems,
  model: modelMenuItems,
  fastRequest: requestMenuItems,
  dir: undefined,
};

const MethodWrap = styled.span`
  color: #41ca9d;
  margin-right: 4px;
`;

const Title = ({
  title,
  type,
  icon = "default",
}: {
  title: string;
  type: TreeNodeType;
  icon?: TitleIconProps["icon"];
}) => {
  const items = menus[type];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <>
      {title}
      {items ? (
        <Dropdown menu={menuProps}>
          <IconWrap>
            <EllipsisOutlined />
          </IconWrap>
        </Dropdown>
      ) : null}
    </>
  );
};

const NIcon = memo(TreeIcon);

export const TreeView: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<TreeProps["defaultSelectedKeys"]>([]);
  const [data, setData] = useState<TreeNode[]>([]);
  const { emit } = useEvent();
  const { dispatch } = useRequestRecord();
  const IconFn = useCallback(
    (props: any) => <NIcon type={props.type} selected={props.selected} expanded={props.expanded} />,
    []
  );
  const { t } = useTranslation();
  useEffect(() => {
    const treeData: TreeNode<ApiRequest>[] = [
      {
        title: <I18n id="api" />,
        key: "api",
        icon: IconFn,
        type: "api",
        children: [
          {
            title: <Title title={t("dir")} type="dir" />,
            key: "0-0-0",
            type: "dir",
            icon: IconFn,
            children: [
              {
                title: <Title title="接口1" type="api" icon="get" />,
                key: "0-0-0-0",
                icon: IconFn,
                type: "api",
                value: {
                  bodyType: "json",
                  body: "aaaaaaas",
                  httpMethod: "GET",
                  url: "http:localhost:3000/ok",
                  params: [{ id: 1, value: 1, name: "name", sort: 1 }],
                  headers: [{ id: 2, value: 1, name: "name", sort: 2 }],
                },
              },
              {
                title: <Title title="接口2" type="api" icon="post" />,
                key: "0-0-0-1222",
                icon: IconFn,
                type: "api",
                value: {
                  httpMethod: "GET",
                  url: "",
                  params: [{ value: 2, name: "name" }],
                },
              },
            ],
          },
        ],
      },
      {
        title: <I18n id="schema" />,
        key: "model",
        type: "model",
        children: [
          {
            title: "parent 2-0",
            key: "0-1-011",
            // icon: Icon(),
            type: "dir",
            children: [
              {
                title: <Title title="leaf" type="model" icon={<MoneyCollectOutlined />} />,
                key: "0-1-0-0",
                // icon: Icon("get"),
                type: "model",
              },
            ],
          },
        ],
      },
      {
        title: <I18n id="request" />,
        key: "fast-request",
        type: "fastRequest",
        children: [
          {
            title: "parent 2-0",
            key: "0-1-0",
            // icon: Icon(),
            type: "dir",
            children: [
              {
                title: "fastRequest",
                key: "0-1-0-12",
                type: "fastRequest",
              },
            ],
          },
        ],
      },
    ];
    setData(treeData);
  }, []);

  const handleSelect = (_: any, info: { node: TreeNode; selected: boolean }) => {
    const { node, selected } = info;
    const type = node.type;
    if (type == "dir") {
      setExpandedKeys((pre) => {
        if (selected) {
          return [...(pre ?? []), node.key];
        } else {
          return [...(pre ?? [])].filter((k) => k !== node.key);
        }
      });
    }
    if (type == "model" || type == "api" || type == "fastRequest") {
      emit("addTab", { ...node, id: node.key });
      dispatch({ type: "Set-Request", payload: node.value });
    }
  };

  const handleExpand = (keys: any) => {
    setExpandedKeys(keys);
  };

  return (
    <div>
      <Tree
        expandedKeys={expandedKeys}
        onSelect={handleSelect}
        onExpand={handleExpand}
        treeData={data}
        blockNode
        showIcon
        switcherIcon={<DownOutlined />}
      />
    </div>
  );
};
