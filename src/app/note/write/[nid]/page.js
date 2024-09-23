'use client';
import FormContainer from '../../../../Note/containers/FormContainer';

const NoteWritePage = () => {
  return (
    <div>
      <h1>노트 목록</h1>
      <FormContainer />
    </div>
  );

}
export default React.memo(NoteWritePage);

