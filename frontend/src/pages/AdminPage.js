import React from 'react'
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
      <div>AdminPage</div>
      <Users/>
    </>
  )
}

export default AdminPage
