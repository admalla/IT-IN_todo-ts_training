import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from "../../Task";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/TaskAPI";


// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        // @ts-ignore
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '333333jdjdj', title: "HTML&CSS", status: TaskStatuses.New,
            todoListId: 'fgdosrg8rgjuh',
            priority: TaskPriorities.Low,
            order: 0,
            deadline: '',
            startDate: '',
            addedDate: '',
            description: ''},
        todolistId: 'fgdosrg8rgjuh'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: '33333jj3jjs', title: "HTML&CSS", status: TaskStatuses.New,
            todoListId: 'fgdosrg8rgjuh',
            priority: TaskPriorities.Low,
            order: 0,
            deadline: '',
            startDate: '',
            addedDate: '',
            description: ''},
    },
};
