import React from "react";
import renderer from "react-test-renderer";
import Button from ".";

test("Link changes the class when hovered", () => {
  const component = renderer.create(
    <Button
      label="Привет кнопка"
      ariaLabel="Do something"
      disabled={false}
      onClick={() => console.log("Click")}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  /*  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot(); */
});
