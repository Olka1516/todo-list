# Description of the task

1. Create components:

- Create an InputBlock component with an input field for a new task and an "Add" button.
- Create a ListBlock and TaskBlock component to display a list of tasks.

2. Create application state with Pinia:

- Create a store file for Pinia and define the status of todos (list of tasks) in it.
- Create functions for adding, deleting, editing and marking a task as complete.

3. Connect the components to the main file:

- In App.vue, connect the InputBlock component by giving it the function of adding a task and the ListBlock component by giving it the list of tasks and the functions of deleting, editing and marking a task as completed.

4. State and event management:

- In the InputBlock component, when the user clicks the Add button, call the Pinia function to add the task to the state.
- In the ListBlock component, handle events for deleting, editing and marking a task as complete by calling the appropriate Pinia functions.

5. State saving:

- Add the ability to save the state of the application after reloading the page using firebase.

6. Design and styling:

- Stylize components and interface, add an edit button (optional) to change the task text.
- Provide an aesthetic and readable design.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
