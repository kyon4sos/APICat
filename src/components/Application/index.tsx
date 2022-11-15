import React, { Children, PropsWithChildren } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../../layout";
import { Container } from "../Container";

export type ApplicationProps = {};

export const AppCore: React.FC<PropsWithChildren<ApplicationProps>> = ({ children }) => {
  return (
    <HashRouter>
      <Routes>
        {Children.map(children, (item: any) => {
          const { index, name } = item.props;
          return (
            <Route path="/" element={<Layout />}>
              <Route index={index} path={name} element={<Container {...item.props} />}></Route>
            </Route>
          );
        })}
      </Routes>
    </HashRouter>
  );
};
