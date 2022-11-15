import React, { useState } from "react";
import { NTabs } from "@/components";
import { getId } from "@/utils";
import { Items } from "@/components/Tabs";
import { JsonView } from "@/components/JsonView";

export const ResponseExample: React.FC = () => {
  const [value, setValue] = useState({
    code: 2000,
    msg: "ok",
  });
  const items = [
    {
      label: "成功",
      key: "200",
      children: (
        <>
          <h1>hello</h1>
        </>
      ),
    },
    {
      label: "公共响应",
      key: "common",
      children: <>公共响应</>,
    },
  ];

  const handleChange = (key: string, items: Items) => {
    console.log(key, items);
  };

  const addTab = () => {
    return {
      children: <JsonView value={value} />,
      label: "测试",
      key: getId(),
    };
  };

  return (
    <>
      <NTabs title="响应示例" items={items} onChange={handleChange} addTab={addTab} children={<h1>hello</h1>} />
    </>
  );
};
