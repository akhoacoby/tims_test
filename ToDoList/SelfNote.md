Part 2: The Free Project

My trip:

While this project was being made, I was looking into a new JavaScript framwork. I chose the idea of the To-do List App after giving it a lot of thought. My ideas come from a real app called "Notion" that helps you to do things. Because I like how easy it is to use and how accessible it is, I want to make my own Notion version for this project. It goes without saying that I want to make the front end experience that sparks the most "Notion" ideas.

The next step is to choose a structure. I picked the React framework because it is well-known, very flexible, and has a lot of support from outside libraries.

I began making the project by using the VSC creation with Vite + React. To make React frames, Vite is a very useful tool. Of course, I did use it to make making the file easier.

It's a bit different from a regular JS file because React frameworks write in jsx (JavaScript extension), so I had to look for the organization and the ideas in order to make the project. These are the sources I use most often:

- react.dev: the main react website where I can learn all the ideas behind React (Components, Hooks)
- chatGPT: chat helps me with all my questions while I'm learning, and I also used it when I wrote code that didn't work right to help me fix it
- YouTube: To better understand the ideas, I watched a number of videos on YouTube. Some people have made To Do lists in React and posted them on YouTube. I looked at them and got ideas for the code from them.

As I worked on the project, the most useful things I learned were about React components, props, React State, and React Hook.

- React components are what make the app look good and let you interact with it. To use the component, we will mostly be sending props through to talk to other components.
- Rendering is a strong idea in React that is linked to React State. If we want to connect with or change some of the screen's elements every time we launch a React app, we need to render the changes. If we don't, nothing will be shown. But local variables don't stay the same between renders, and changes to them won't cause renders. This means that if we want the app to "render" things, we need to store them in State, which is component-specified memory.
- React Hook is the tool we use to make this state variable. It gives us a way to change the variable and tells React to display the component again. The "useState" Hook is the most usual, but we can also use other hooks for certain tasks.

After that comes the process of making the project.

The things that my app can do are:

- There are four columns, each with a task's state (backlog, todo, inProgress, and done).
- There is a "Add task" button in each column. When we click on it, a textarea appears where we can enter a new task. We can save it by pressing the "Add" button or close it with the "Close" button.
- If we move the mouse over a task, a brush tool appears, and we can click on it to change it. The cursor can only be moved with the keyboard, and we press "Enter" to save the changes.
- As we move the tasks from one column to another, we can drag and drop them.
- There are indicators between the tasks that let us know where to put it back.
- On the right is a trash can where we can drag tasks to get rid of them.
- On top is a button that lets us change the style.

What bugs me the most about writing the project is how to keep track of and save the task in a main list between each render. I first put the tasks in a list with unique IDs that were created every time a new task was added. The value of each ID was the next integer number in the main list's length. But when I tried to use localStorage to make the app work after reloads, the ID would get mixed up because the ID from the list length is updated every time the page is rendered, so I use the item list length from localStorage for the ID. This is why I added two more buttons: "Reset" to clear all the tasks on the screen and "Delete log" to clear the data in the localStorage.

I'm really proud of what this project has helped me achieve in the end.
