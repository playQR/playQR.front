//임시 에러 핸들링 함수
export const handleApiError = (error:any) => {
  // 콘솔 로그에서 민감한 정보 제거
  console.error('Error: ', error.message || 'An unknown error occurred.');
};