import { createVNode } from "../vdom.js";
import TaskItem from "./TaskItem.js";

const Tasks = ({ tasks }) => {
  return (
    <div class="tasks-list">
      {tasks.map(task => <TaskItem task={task} />)}
    </div>
  )
}

export default Tasks
