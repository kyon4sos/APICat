import { ApiOutlined, SendOutlined, CodepenOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Card, CardProp } from "../../../components/Card";
import { ListWrap } from "./style";
import { RequestView } from "../RequetView";
import { I18n } from "@/components/FormattedMessage";

const iconStyle = { fontSize: 60 };

const cards = [
  {
    id: "api",
    title: <I18n id="newApi" />,
    icon: <ApiOutlined style={iconStyle} />,
  },
  {
    id: "request",
    title: <I18n id="newFastRequest" />,
    icon: <SendOutlined style={iconStyle} />,
  },
  {
    id: "model",
    title: <I18n id="newFastRequest" />,
    icon: <CodepenOutlined style={iconStyle} />,
  },
];

export const NewView = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = (item: CardProp) => {
    setVisible(true);
  };

  return (
    <>
      {visible ? (
        <RequestView />
      ) : (
        <ListWrap>
          {cards.map((card) => (
            <Card key={card.id} icon={card.icon} title={card.title} onClick={() => handleClick(card)} />
          ))}
        </ListWrap>
      )}
    </>
  );
};
