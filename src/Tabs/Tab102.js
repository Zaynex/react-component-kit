import React, { useState, useContext, useMemo } from "react";

const getClassName = (baseName, isSelected) =>
  (isSelected ? [baseName].concat("selected") : [baseName]).join(" ");

const Tab = ({ onClick, children, isSelected, diasbled = false}) => {
  const className = getClassName("tab-list-item", isSelected);
  const style = diasbled  ? { color: '#ccc'} : {}
  return (
    <div className={className} style={style}onClick={ !diasbled && onClick}>
      {children}
    </div>
  );
};

const TabPanels = ({ children }) => {
  const context = useContext(TabsContext);

  return (
    <div className="tabpanels">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isSelected: index === context.selectedIndex
        });
      })}
    </div>
  );
};

const TabPanel = ({ children, isSelected }) => {
  const { forceRender } = useContext(TabsContext);
  if (!isSelected && !forceRender) return null;
  const showOrHidden = !isSelected && forceRender ?  {display: 'none'} : {}
  return <div className="tab-panel-item" style={showOrHidden}>{children}</div>;
};

const TabsContext = React.createContext({});

const Tabs = ({ children, defaultIndex, forceRender = true }) => {
  const [selectedIndex, setSelectedIndex] = useState(
    typeof defaultIndex === "number" ? defaultIndex : 0
  );
  const context = useMemo(() => ({ selectedIndex, setSelectedIndex, forceRender }), [
    selectedIndex,
    setSelectedIndex,
    forceRender
  ]);
  return (
    <TabsContext.Provider value={context}><div className="tabs">{children}</div></TabsContext.Provider>
  );
};

const TabList = ({ children }) => {
  const context = useContext(TabsContext);
  return (
    <div className="tablist">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          onClick: () => context.setSelectedIndex(index),
          isSelected: index === context.selectedIndex
        });
      })}
    </div>
  );
};

export const Tab102 = () => {
  const CoolTab = React.forwardRef((props, ref) => {
    return (
      <Tab ref={ref} isSelected={props.isSelected} {...props}>
        {props.isSelected ? "😎" : "😐"}
        {props.children}
      </Tab>
    );
  });
  return (
    <Tabs defaultIndex={1} forceRender={true}>
      <TabList>
        <Tab>tab0</Tab>
        <Tab diasbled>tab1</Tab>
        <CoolTab>tab2</CoolTab>
      </TabList>
      <TabPanels>
        <TabPanel onClick={() => console.log("jell")}>TabContent 0</TabPanel>
        <TabPanel>TabContent 1</TabPanel>
        <TabPanel>TabContent 2</TabPanel>
      </TabPanels>
    </Tabs>
  );
};