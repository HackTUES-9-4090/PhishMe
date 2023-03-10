import React, { useState } from "react";
import { Table } from "antd";
import { VerticalLeftOutlined } from "@ant-design/icons";
import { textColor } from "../../../utils/Constants";
import Text from "../../../components/Text.component";
import GlobalStyles from "../../../utils/GlobalStyles.module.css";
import { useEffect } from "react";
import useFetch from "../../../hoc/useFetch";

function AttackTable({ attackData }) 
{
  console.log(attackData);
  function render(text, record) {
    return {
      props: {
        style: {
          background: "rgba(20, 66, 114, 0.8)",
          color: textColor,
          borderColor: "#0A2647",
        },
      },
      children: <div>{text}</div>,
    };
  }
  const columns = [
    {
      title: "Name",
      width: 300,
      align: "center",
      dataIndex: "name",
      key: "name",
      render,
    },
    {
      title: "Email",
      width: 300,
      align: "center",
      dataIndex: "email",
      key: "email",
      render,
    },
    {
      title: "Clicked fail",
      width: 200,
      align: "center",
      dataIndex: "clickedFail",
      key: "clickedFail",
      render,
    },
    {
      title: "Submit fail",
      width: 200,
      align: "center",
      dataIndex: "submitFail",
      key: "submitFail",
      render,
    },
  ];

  const dataa = [
    { key: "1", name: "Danail", clickedFail: "da", submitFail: "ne" },
    { key: "2", name: "Danail", clickedFail: "da", submitFail: "ne" },
    { key: "3", name: "Danail", clickedFail: "da", submitFail: "ne" },
    { key: "4", name: "Danail", clickedFail: "da", submitFail: "ne" },
    {
      key: "5",
      name: "Danail",
      clickedFail: <VerticalLeftOutlined />,
      submitFail: "ne",
    },
  ];
  return (
    <>
      <Text text={"Attack "} style={{ fontSize: 20 }} />
      <div
        className={GlobalStyles.centeredRow}
        style={{ justifyContent: "space-around" }}
      >
        <Text text={"Attack name"} style={{ fontSize: 20 }} />
        <Text text={"Attack name"} style={{ fontSize: 20 }} />
        <Text text={"Attack name"} style={{ fontSize: 20 }} />
      </div>
      <Table dataSource={dataa} columns={columns} pagination={false} />;
    </>
  );
}

export default AttackTable;
