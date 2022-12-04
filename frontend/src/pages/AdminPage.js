import React from 'react'
import CreateBoard from '../components/CreateBoard';
import Loading from '../components/Loading';
import TopBar from '../components/Topbar';
import { Users } from '../components/Users';
import { useRequireRole } from '../lib/useRole';

const AdminPage = () => {

    const [loading, userRole] = useRequireRole(['admin']);

    if (loading) {
        return <Loading />;
    }

  return (
    <>
        <TopBar/>
      <CreateBoard/>
    </>
  )
}

export default AdminPage
