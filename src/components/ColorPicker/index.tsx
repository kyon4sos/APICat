import React, { useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { useClickAway } from "react-use";
import styled from "@emotion/styled";

const Color = styled.span`
  display: inline-block;
  height: 30px;
  width: 160px;
  background: ${(props) => props.color ?? "#fff"};
  border: 1px solid #ccc;
`;

const Wrap = styled.div`
  position: absolute;
  z-index: 99;
`;

export const ColorPicker: React.FC<ColorPickerProps> = ({ onChange, value: val }) => {
  const [value, setValue] = useState(val);
  const [display, setDisplay] = useState(false);
  const ref = useRef<any>(null);

  useClickAway(ref, () => {
    setDisplay(false);
  });
  const handleChange = (value: any) => {
    setValue(value);
    onChange && onChange(value);
  };

  const handleClick = () => {
    setDisplay((pre) => !pre);
  };
  return (
    <>
      <Color color={value?.hex} onClick={handleClick} />
      {display ? (
        <Wrap className="wrap" ref={ref}>
          <SketchPicker presetColors={["#1890ff", "#25b864", "#ff6f00"]} color={value} onChange={handleChange} />
        </Wrap>
      ) : null}
    </>
  );
};

type ColorPickerProps = {
  onChange?: (val: any) => void;
  value?: any;
};
