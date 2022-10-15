import { Layout } from '../../layout';
import { Info } from '../../components';
import { useParams } from 'react-router-dom';

const ProfilePage = (): JSX.Element => {
  const { id } = useParams();
  return (
    <Layout main={false}>
      <Info id={id} />
    </Layout>
  );
};

export default ProfilePage;
