import { useParams } from 'react-router-dom';
function Profile() {
  const { username } = useParams();
  return <h2>Profile of {username}</h2>;
}
export default Profile;