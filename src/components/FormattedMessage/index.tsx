import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { i18nKey } from "../../locale/config";

type LabelProps = {
  id: i18nKey;
};

export const I18n: React.FC<LabelProps> = ({ id }) => {
  return <Trans i18nKey={id}></Trans>;
};
