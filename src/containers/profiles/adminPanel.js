import React, { useContext } from 'react'
import { Admin, Resource } from 'react-admin'
import client from '../../vendors/feather'
import { restClient, authClient } from 'ra-data-feathers'
import {
    SubjectList,
    SubjectEdit,
    SubjectCreate,
    SubjectIcon,
} from '../../components/admin/subjectRessource'
import {
    DepartmentList,
    DepartmentEdit,
    DepartmentCreate,
    DepartmentIcon,
} from '../../components/admin/departmentRessource'
import {
    YearList,
    YearEdit,
    YearCreate,
    YearIcon,
} from '../../components/admin/yearsRessource'
import {
    PostList,
    PostEdit,
    PostCreate,
    PostIcon,
} from '../../components/admin/postRessource'
import { AuthContext } from '../../store/contexts/auth/authContext'
import { UserContext } from '../../store/contexts/user/userContext'
import { AppTheme } from '../../App'

export default function AdminPanel() {
    const { authState } = useContext(AuthContext)
    const { userData } = useContext(UserContext)

    const restClientOptions = {
        id: '_id', // In this example, the database uses '_id' rather than 'id'
        usePatch: true, // Use PATCH instead of PUT for updates
    }

    const authClientOptions = {
        storageKey: 'feathers-jwt',
        authenticate: { strategy: 'local' },
        redirectTo: authState.isAuthenticated ? '/' : '/login',
        logoutOnForbidden: false,
        permissionsField: 'permissions',
        permissionsKey: 'permissions',
        passwordField: 'password',
        usernameField: 'email',
        id: '_id',
    }
    return (
        <Admin
            theme={AppTheme(userData?.appTheme)}
            title="TutorINSA - Panel Administrateur"
            dataProvider={restClient(client, restClientOptions)}
            authProvider={authClient(client, authClientOptions)}
        >
            <Resource
                name="subjects"
                list={SubjectList}
                edit={SubjectEdit}
                create={SubjectCreate}
                icon={SubjectIcon}
            />
            <Resource
                name="years"
                list={YearList}
                edit={YearEdit}
                create={YearCreate}
                icon={YearIcon}
            />
            <Resource
                name="departments"
                list={DepartmentList}
                edit={DepartmentEdit}
                create={DepartmentCreate}
                icon={DepartmentIcon}
            />
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                icon={PostIcon}
            />
        </Admin>
    )
}
