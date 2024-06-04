module.exports = {
    input: [
      'src/**/*.{js,jsx,ts,tsx}', // 번역 키를 추출할 파일 경로 패턴
    ],
    output: './src/locales', // 번역 파일이 생성될 경로
    options: {
      debug: true, // 디버그 모드 활성화
      removeUnusedKeys: true, // 사용되지 않는 번역 키 제거
      func: {
        list: ['i18next.t', 'i18n.t', 't'], // 번역 키를 찾을 함수 목록
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // 번역 키를 찾을 파일 확장자 목록
      },
      lngs: ['en', 'ko'], // 지원할 언어 목록
      defaultLng: 'en', // 기본 언어
      defaultNs: 'translation', // 기본 네임스페이스
      resource: {
        loadPath: 'src/locales/{{lng}}/{{ns}}.json', // 번역 파일을 불러올 경로
        savePath: 'src/locales/{{lng}}/{{ns}}.json', // 번역 파일을 저장할 경로
        jsonIndent: 2, // JSON 파일 들여쓰기
      },
      keySeparator: false, // 키 구분자 사용 여부
      nsSeparator: false, // 네임스페이스 구분자 사용 여부
    },
  };