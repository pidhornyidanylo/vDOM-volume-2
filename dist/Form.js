import { createVNode } from "./vdom.js";
const Form = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return createVNode("form", {
    onsubmit: handleSubmit
  }, createVNode("label", {
    for: "name"
  }, "Name:"), createVNode("input", {
    id: "name",
    type: "text",
    name: "name"
  }), createVNode("button", {
    type: "submit"
  }, "Submit"));
};
export default Form;