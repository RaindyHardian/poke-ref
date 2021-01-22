import React from "react";

import typeColor from "../typeColor";

it("return value correctly", () => {
  expect(typeColor("normal")).toEqual("type-normal");
  expect(typeColor("ground")).toEqual("type-ground");
  expect(typeColor("fire")).toEqual("type-fire");
  expect(typeColor("water")).toEqual("type-water");
  expect(typeColor("shadow")).toEqual("type-shadow");
});
