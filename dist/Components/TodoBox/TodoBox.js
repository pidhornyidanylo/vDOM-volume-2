import { createVNode } from "../../vdom.js";
import "./TodoBox.css";
const TodoBox = ({
  children
}) => {
  return createVNode(React.Fragment, null, children);
};
export default TodoBox;