import { createVNode } from "../vdom.js"

const TaskItem = ({ task }) => {
  return (
    <li key={task.id}>
      {task.task}
    </li>
  )
}

export default TaskItem
