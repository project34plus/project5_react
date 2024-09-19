import Container from '@/commons/components/Container';

const { default: SubMenus } = require('./components/SubMenus');

const Recommend = () => {
  return (
    <>
      <Container>
        <h1>논문 추천페이지</h1>
        <SubMenus />
      </Container>
    </>
  );
};

export default Recommend;
