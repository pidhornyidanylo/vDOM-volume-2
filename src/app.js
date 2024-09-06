import {
    createVNode,
    patch
} from "./vdom.js";
import TodoBox from "./components/TodoBox.js";
import Form from "./components/Form.js";
import Tasks from "./components/Tasks.js";

const createVApp = store => {
    const { count } = store.state;
    
    const decrement = () => store.setState({ count: store.state.count - 1 });
    const increment = () => store.setState({ count: store.state.count + 1 });
  
    return (
      <div {...{ class: "container", "data-count": String(count) }}>
        <h1>Hello, Virtual DOM</h1>
        <div>Count: {String(count)}</div>
        Text node without tags
        <img src="https://i.ibb.co/M6LdN5m/2.png" width="400" />
        <div class="buttons-container">
            <button id="decrease-button" onclick={decrement}>-1</button>
            <button id="increase-button" onclick={increment}>+1</button>
        </div>
        <TodoBox 
          children={
            <div>
                <Form />
                <Tasks />
            </div>
          } 
        />
      </div>
    );
  };
  
  export const store = {
    state: { count: 0, inputValue: "" },
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