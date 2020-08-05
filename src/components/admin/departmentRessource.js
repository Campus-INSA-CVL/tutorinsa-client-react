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
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

export const DepartmentIcon = LocalOfferIcon
export const DepartmentList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="_id" />
            <TextField source="name" />
            <EditButton basePath="/departments" />
        </Datagrid>
    </List>
)

const PostTitle = () => {
    return <span>Departments</span>
}

export const DepartmentEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput source="_id" disabled />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
)

export const DepartmentCreate = (props) => (
    <Create title="Create a Department by specifying a name" {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
)
