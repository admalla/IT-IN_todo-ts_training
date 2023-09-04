import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AddItemTask from "../../AddItemTask/AddItemTask";

const meta: Meta<typeof AddItemTask> = {
    title: 'TODOLIST/AddItemTask',
    component: AddItemTask,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },

};

export default meta;
type Story = StoryObj<typeof AddItemTask>;



export const Basic: Story = {
    args: {
        addItem: action("add List")
    }
}