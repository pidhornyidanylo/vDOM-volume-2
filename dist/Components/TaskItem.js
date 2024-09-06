import { createVNode } from "../vdom.js";
const TaskItem = ({
  task
}) => {
  return createVNode("li", {
    key: task.id
  }, task.task);
};
export default TaskItem;