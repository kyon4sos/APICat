import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { githubLight } from "@uiw/codemirror-theme-github";
import jsBeautify from "js-beautify";

const Editor: React.FC<CodeEditorProps> = ({ value, editorRef: ref, onChange: _onChange, ...restProps }) => {
  const val: any = value && typeof value == "object" ? JSON.stringify(value) : value ?? "";
  const onChange = React.useCallback(
    (value: any, viewUpdate: any) => {
      _onChange && _onChange(value);
    },
    [_onChange]
  );

  useImperativeHandle(ref, () => ({
    format: () => {
      return jsBeautify(value ?? "");
    },
  }));

  return (
    <CodeMirror height="200" {...restProps} value={val} onChange={onChange} theme={githubLight} extensions={[json()]} />
  );
};

export type EditRef = {
  format: FormatHandle;
};

export type CodeEditorProps = {
  value?: string;
  editorRef?: ForwardedRef<EditRef>;
  onChange?: (value: string) => void;
} & ReactCodeMirrorProps;

type FormatHandle = () => string;

export const CodeEditor = forwardRef<EditRef, CodeEditorProps>((props, ref) => <Editor {...props} editorRef={ref} />);
