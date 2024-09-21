import Container from '@/commons/components/Container';
import RecommendList from './components/RecommendList';

const { default: SubMenus } = require('../../thesis/components/SubMenus');

const Recommend = () => {
  return (
    <>
      <Container>
        <h1>논문 추천페이지</h1>
        <SubMenus />
        <RecommendList />
      </Container>
    </>
  );
};

export default Recommend;
