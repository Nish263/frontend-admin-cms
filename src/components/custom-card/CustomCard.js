import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./customCard.style.css";

export const CustomCard = ({ title }) => {
  return (
    <Card style={{ minwidth: "18rem" }}>
      <Card.Body className=" py-3 ">
        <Card.Title className="m-5"> 455</Card.Title>
        <Card.Text className="fw-bolder fs-2">{title}</Card.Text>
      </Card.Body>
    </Card>
  );
};
