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
import MenuBookIcon from '@material-ui/icons/MenuBook'

export const SubjectIcon = MenuBookIcon

export const SubjectList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="_id" />
            <TextField source="name" />
            <EditButton basePath="/subjects" />
        </Datagrid>
    </List>
)

const PostTitle = () => {
    return <span>Subjects</span>
}

export const SubjectEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput source="_id" disabled />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
)

export const SubjectCreate = (props) => (
    <Create title="Create a subject by specifying a name" {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
)
