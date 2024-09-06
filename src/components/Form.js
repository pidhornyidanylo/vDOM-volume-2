import { createVNode } from "../vdom.js";
import { store } from "../app.js";

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleInput = (e) => {
    e.preventDefault();
    store.setState({ ...store.state, inputValue: e.target.value });
    console.log("Current input value:", e.target.value); 
  };

  return (
    <form onsubmit={handleSubmit}>
      <label for="name">Task:</label>
      <input
        value={store.state.inputValue || ""}
        oninput={handleInput} 
        id="name"
        type="text"
        name="name"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;