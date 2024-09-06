import { createVNode } from "../vdom.js";
import { store } from "../app.js";
const Form = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const handleChange = e => {
    e.preventDefault();
    store.setState({
      ...store.state,
      inputValue: e.target.value
    });
    console.log(store);
  };
  return createVNode("form", {
    onsubmit: handleSubmit
  }, createVNode("label", {
    for: "name"
  }, "Task:"), createVNode("input", {
    value: store.state.inputValue,
    onchange: handleChange,
    id: "name",
    type: "text",
    name: "name"
  }), createVNode("button", {
    type: "submit"
  }, "Submit"));
};
export default Form;