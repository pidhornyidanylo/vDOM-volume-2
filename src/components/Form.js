import { createVNode } from "../vdom.js";
import { store } from "../app.js";

const Form = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { tasks, inputValue } = store.state;
    if(!inputValue.length) { return }
    store.setState({ ...store.state, tasks: [...tasks, { id: tasks.length + 1, task: store.state.inputValue}] });
  };
  console.log(store.state);
  const handleInput = (e) => {
    e.preventDefault();
    store.setState({ ...store.state, inputValue: e.target.value });
  };

  return (
    <form class="task-form" onsubmit={handleSubmit}>
      <label class="task-label" for="name">Task:</label>
      <input
        class="task-input"
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