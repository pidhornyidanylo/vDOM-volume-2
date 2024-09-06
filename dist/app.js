import { createVNode, patch } from "./vdom.js";
import TodoBox from "./components/TodoBox.js";
import Form from "./components/Form.js";
import Tasks from "./components/Tasks.js";
const createVApp = store => {
  const {
    count,
    tasks
  } = store.state;
  const decrement = () => store.setState({
    ...store.state,
    count: store.state.count - 1
  });
  const increment = () => store.setState({
    ...store.state,
    count: store.state.count + 1
  });
  return createVNode("div", {
    class: "container",
    "data-count": String(count)
  }, createVNode("div", {
    class: "demo1-container"
  }, createVNode("h1", null, "Hello, Virtual DOM"), createVNode("div", null, "Count: ", String(count)), "Text node without tags", createVNode("img", {
    class: "demo1-image",
    src: "https://i.ibb.co/M6LdN5m/2.png",
    width: "400"
  }), createVNode("div", {
    class: "buttons-container"
  }, createVNode("button", {
    id: "decrease-button",
    onclick: decrement
  }, "-1"), createVNode("button", {
    id: "increase-button",
    onclick: increment
  }, "+1"))), createVNode(TodoBox, {
    children: createVNode("div", {
      class: "demo2-container"
    }, createVNode(Form, null), createVNode(Tasks, {
      tasks: tasks
    }))
  }));
};
export const store = {
  state: {
    count: 0,
    inputValue: "",
    tasks: []
  },
  onStateChanged: () => {},
  setState(nextState) {
    this.state = nextState;
    this.onStateChanged();
  }
};
let app = patch(createVApp(store), document.getElementById("app"));
store.onStateChanged = () => {
  app = patch(createVApp(store), app);
};