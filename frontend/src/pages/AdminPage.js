import React from 'react'
import Loading from '../components/Loading';
import TopBar from '../components/Topbar';
import { useRequireRole } from '../lib/useRole';

const AdminPage = () => {

    const [loading, userRole] = useRequireRole('admin');

    if (loading) {
        return <Loading />;
    }

  return (
    <>
        <TopBar/>
      <div>AdminPage</div>
    </>
  )
}

export default AdminPage
