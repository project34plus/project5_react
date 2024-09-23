import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';
import ThesisUploadContainer from '@/thesis/containers/ThesisUploadContainer';

const UploadPage = () => {
  return (
    <MemberOnlyContainer>
      <ThesisUploadContainer />
    </MemberOnlyContainer>
  );
};
export default UploadPage;
