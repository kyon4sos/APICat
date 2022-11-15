import { useEvent } from "@/hooks/use-event";
import { SettingOutlined, SkinOutlined } from "@ant-design/icons";
import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../store/app";
import { ColorPicker } from "../ColorPicker";
import { I18n } from "../FormattedMessage";
import NModal from "../Modal";

const FormItem = Form.Item;

const GeneralSetting = () => {
  const [form] = Form.useForm<{ lang: string; age: number }>();
  const lang = Form.useWatch("lang", form);
  const { i18n } = useTranslation();
  const { dispatch } = useAppContext();

  useEffect(() => {
    i18n.changeLanguage(lang);
    dispatch({ type: "Set-Lang", payload: lang });
  }, [lang]);

  return (
    <Form form={form}>
      <FormItem name="lang" label={<I18n id="lang" />}>
        <Select
          style={{ width: 200 }}
          options={[
            { label: <I18n id="en" />, value: "en" },
            { label: <I18n id="cn" />, value: "zhCN" },
          ]}
        ></Select>
      </FormItem>
    </Form>
  );
};

const Theme = () => {
  const [form] = Form.useForm();
  const { dispatch } = useAppContext();
  const onValuesChange = (values: any, value: any) => {
    if (values.primary) {
      dispatch({
        type: "Set-Theme",
        payload: {
          primaryColor: values.primary.hex,
        },
      });
    }
    if (values.text) {
      document.body.style.setProperty("--ant-text-color", values.text.hex);
    }

    // Object.keys(values).forEach((key) => {
    //   document.body.style.setProperty(key, values[key].hex);
    // });
  };
  return (
    <>
      <Form
        layout="horizontal"
        wrapperCol={{
          span: 20,
        }}
        labelCol={{
          span: 3,
        }}
        form={form}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="Primary" name="primary">
          <ColorPicker />
        </Form.Item>
        <Form.Item label="Text" name="text">
          <ColorPicker />
        </Form.Item>
        {/* <Form.Item label="Side" name="--bg-color-1">
          <ColorPicker />
        </Form.Item>
        <Form.Item label="Nav" name="--bg-color-2">
          <ColorPicker />
        </Form.Item>
        <Form.Item label="Main" name="--bg-color-3">
          <ColorPicker />
        </Form.Item> */}
      </Form>
    </>
  );
};

const AppSetting = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const items = [
    {
      key: 1,
      label: t("skin"),
      icon: <SkinOutlined />,
      view: <Theme />,
    },
    {
      key: "2",
      label: t("general"),
      icon: <SettingOutlined />,
      view: <GeneralSetting />,
    },
  ];
  useEvent([
    {
      event: "showAppSetting",
      handler: showAppSetting,
    },
  ]);

  function showAppSetting() {
    setOpen(true);
  }
  const onChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <NModal
      items={items}
      open={open}
      title={<I18n id="setting" />}
      onChange={onChange}
    ></NModal>
  );
};

export default AppSetting;
