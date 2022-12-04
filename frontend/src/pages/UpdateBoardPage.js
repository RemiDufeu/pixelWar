import React from 'react'
import UpdateBoard from '../components/UpdateBoard';
import Loading from '../components/Loading';
import TopBar from '../components/Topbar';
import { Users } from '../components/Users';
import { useRequireRole } from '../lib/useRole';

const UpdateBoardPage = () => {

    const [loading, userRole] = useRequireRole(['admin']);

    if (loading) {
        return <Loading />;
    }

  return (
    <>
        <TopBar/>
      <UpdateBoard/>
    </>
  )
}

export default UpdateBoardPage
