import React from 'react';
import styled from 'styled-components';
import { deleteThesis } from '@/thesis/apis/apiUpload';
import { useRouter } from 'next/navigation';

const ThesisDelete = ({ tid, className }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteThesis(tid); // 논문 삭제 API 요청
        alert('논문이 삭제되었습니다.');
        router.push('/thesis/mypage'); // 삭제 후 경로 이동
      } catch (error) {
        console.error('논문 삭제 중 오류가 발생했습니다:', error);
        alert('논문 삭제에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <button onClick={handleDelete} className={className}>
      논문 삭제
    </button>
  );
};

export default React.memo(ThesisDelete);
