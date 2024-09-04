import { createVNode, patch } from "./vdom.js";
const createVApp = store => {
  const {
    count
  } = store.state;
  return createVNode("div", {
    class: "container",
    "data-count": count
  }, [createVNode("h1", {}, ["Hello, Virtual DOM"]), createVNode("div", {}, [`Count: ${count}`]), "Text node without tags", createVNode("img", {
    src: "https://i.ibb.co/M6LdN5m/2.png",
    width: 400
  }), createVNode("div", {
    class: "buttons-container"
  }, [createVButton({
    text: "-",
    id: "decrease-button",
    onclick: () => store.setState({
      count: store.state.count - 1
    })
  }), createVButton({
    text: "+",
    id: "increase-button",
    onclick: () => store.setState({
      count: store.state.count + 1
    })
  })])]);
};
const createVButton = props => {
  const {
    text,
    id,
    onclick
  } = props;
  return createVNode("button", {
    id: id,
    onclick
  }, [text]);
};
const store = {
  state: {
    count: 0
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