import Container from '@/commons/components/Container';
import RecommendList from '../../thesis/components/RecommendList';
import ThesisRecommendListContainer from '@/thesis/containers/ThesisRecommendListContainer';

const { default: SubMenus } = require('../../thesis/components/SubMenus');

const Recommend = () => {
  return (
    <>
      <h1>논문 추천페이지</h1>
      <ThesisRecommendListContainer />
    </>
  );
};

export default Recommend;
