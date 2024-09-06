import { createVNode } from "../vdom.js";
import TaskItem from "./TaskItem.js";
const Tasks = ({
  tasks
}) => {
  return createVNode("div", {
    class: "tasks-list"
  }, tasks.map(task => createVNode(TaskItem, {
    task: task
  })));
};
export default Tasks;