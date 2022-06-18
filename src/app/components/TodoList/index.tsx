import * as React from 'react';
// import * as style from './style.css';
import { TodoActions } from 'app/actions/todos';
import { TodoItem } from '../TodoItem';
import { TodoModel } from 'app/models/TodoModel';

export namespace TodoList {
  export interface Props {
    todos: TodoModel[];
    actions: TodoActions;
  }
}

export class TodoList extends React.Component<TodoList.Props> {
  renderToggleAll(): JSX.Element | void {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      const hasIncompleted = todos.some((todo) => !todo.completed);
      return (
        <input

          type="checkbox"
          checked={hasIncompleted}
          onChange={actions.completeAll}
        />
      );
    }
  }

  render() {
    const { todos, actions } = this.props;
    return (
      <section >
        {this.renderToggleAll()}
        <ul >
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={actions.completeTodo}
              deleteTodo={actions.deleteTodo}
              editTodo={actions.editTodo}
            />
          ))}
        </ul>
      </section>
    );
  }
}
