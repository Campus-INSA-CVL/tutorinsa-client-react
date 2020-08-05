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
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'

export const YearIcon = HourglassEmptyIcon
export const YearList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="_id" />
            <TextField source="name" />
            <EditButton basePath="/years" />
        </Datagrid>
    </List>
)

const PostTitle = () => {
    return <span>Years</span>
}

export const YearEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput source="_id" disabled />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
)

export const YearCreate = (props) => (
    <Create title="Create a Year by specifying a name" {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
)
