import type {Meta, StoryObj} from '@storybook/react';
import App from "../../App/App";
import {store} from "../../state/Store";
import {Provider} from "react-redux";


const meta: Meta<typeof App> = {
    title: 'TODOLIST/App',
    component: App,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Provider store={store}>{Story()}</Provider>
        )
    ]

};

export default meta;
type Story = StoryObj<typeof App>;


export const Basic: Story = {
    args: {
        demo: true
    }
}