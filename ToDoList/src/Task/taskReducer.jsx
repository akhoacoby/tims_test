export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case "add": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          status: action.status,
        },
      ];
    }
    case "modify": {
      return tasks.map((t) => (t.id === action.task.id ? action.task : t));
    }
    case "delete": {
      return tasks.filter((t) => t.id !== action.id);
    }
    case "move": {
      const { taskId, status, beforeId } = action;
      const taskToMove = tasks.find((t) => t.id == taskId);
      if (!taskToMove) return tasks;

      // Supprimer la tâche originale
      let newTasks = tasks.filter((t) => t.id != taskId);

      // Modifier son status
      const updatedTask = { ...taskToMove, status };

      // Trouver où insérer
      const insertAt = newTasks.findIndex((t) => t.id == beforeId);

      if (insertAt === -1 || beforeId === "-1" || beforeId === null) {
        // Si pas trouvé, mettre à la fin
        newTasks.push(updatedTask);
      } else {
        newTasks.splice(insertAt, 0, updatedTask);
      }

      return newTasks;
    }
    default:
      return tasks;
  }
}
