import React, { useState } from "react";
import s from "./styles.module.css";
import ToolsItem from "../ToolsItem";

function Tools(props) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const tools = [
    {
      id: 1,
      title: "Tool 1",
      price: 10.99,
      image: "/images/tool1.jpg",
      description: "This is a description for Tool 1.",
    },
    {
      id: 2,
      title: "Tool 2",
      price: 15.99,
      image: "/images/tool2.jpg",
      description: "This is a description for Tool 2.",
    },
    {
      id: 3,
      title: "Tool 3",
      price: 19.99,
      image: "/images/tool3.jpg",
      description: "This is a description for Tool 3.",
    },
  ];

  return (
    <div>
      <p className={s.title}>Tools and equipment</p>
      <div className={s.tools_container}>
        <p className={s.price}>Price</p>
        <input className={s.from} placeholder="from"></input>
        <input className={s.to} placeholder="to"></input>
        <p className={s.Items}>Discounted items</p>
        <input className={s.inputForDiscounted}></input>
        <label className={s.sorted} htmlFor="my-select">Sorted</label>
        <select  className={s.default}  id="my-select" value={selectedOption} onChange={handleOptionChange}>
          <option value="by default">by default</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="name-a-z">Name: A to Z</option>
          <option value="name-z-a">Name: Z to A</option>
        </select>
      </div>
      <div></div>
      {tools.map((tool) => (
          <ToolsItem item={tool}
          />
      ))}
    </div>
  );
}

export default Tools;

