import React from "react";

interface Props {
  menu: React.ReactNode;
  appBar: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ menu, appBar, children }) => {
  return (
    <div style={{ display: "flex" }}>
      {menu}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div>{appBar}</div>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
