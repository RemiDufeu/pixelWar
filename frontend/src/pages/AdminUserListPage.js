import React from 'react'
import CreateBoard from '../components/CreateBoard';
import Loading from '../components/Loading';
import TopBar from '../components/Topbar';
import { UserList } from '../components/UserList';
import { useRequireRole } from '../lib/useRole';

const AdminUserListPage = () => {

    const [loading, userRole] = useRequireRole(['admin']);

    if (loading) {
        return <Loading />;
    }

  return (
    <>
        <TopBar/>
        <div>AdminPage</div>
        <UserList/>
    </>
  )
}

export default AdminUserListPage
