import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import EditableTitle from "../../EditableTitle/EditableTitle";


// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableTitle> = {
    title: 'TODOLIST/EditableTitle',
    component: EditableTitle,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        title: {
            description: 'Start value empty. Add value push button set string.'
        },
        callBack: {
            description: 'Value EditableSpan changed'
        }
    }
};

export default meta;
type Story = StoryObj<typeof EditableTitle>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanStory: Story = {
    args: {
        title: "new value",
        callBack: action('Value EditableSpan changed')
    }
};
