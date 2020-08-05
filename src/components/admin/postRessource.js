import React from 'react'
import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    TextField,
    EditButton,
    TextInput,
} from 'react-admin'
import PostAddIcon from '@material-ui/icons/PostAdd';

export const PostIcon = PostAddIcon
export const PostList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="_id" />
            <TextField source="type" />
            <EditButton basePath="/posts" />
        </Datagrid>
    </List>
)

const PostTitle = () => {
    return <span>Posts</span>
}

export const PostEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput source="_id" disabled />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
)

export const PostCreate = (props) => (
    <Create title="Create a Post by specifying a name" {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
)
