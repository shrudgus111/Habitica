# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# 지뢰찾기 구현하기

![지뢰찾기썸네일](https://github.com/eeeyooon/portfolio/assets/112360210/ec1aa987-c406-44e3-9752-58b0a84be1ce)

<br/>

## 프로젝트 설치 및 실행

해당 프로젝트를 열고 다음과 같이 명령어를 실행해주세요.

```
npm install
yarn install
```

```
npm run start
yarn start
```

<br/>
<br/>

## 프로젝트 개요

📢 프로젝트 주제 : 지뢰찾기 게임을 구현한 프로젝트입니다.

📆 프로젝트 기간 : 231207 ~ 231211

🍊 [지뢰찾기 게임 해보기](https://yoon-minesweeper.vercel.app/)

<br/>

<br/>
<br/>

## 기술 스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/ReduxToolkit-764ABC?style=flat&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat&logo=styled-components&logoColor=white"/>

폴더 구조와 라이브러리는 README 하단에서 확인할 수 있습니다.

<br/>
<br/>

## 구현 기능

### 지뢰게임 시작

![지뢰찾기시작](https://github.com/eeeyooon/portfolio/assets/102462534/2005c3c6-7241-4d9b-bccc-69c8b1b45486)

- 첫 번째 빈칸을 열면 게임이 시작됩니다.
- 첫 번째 빈칸을 열었을 땐 지뢰가 터지지 않습니다.
- 게임 시작 시 타이머가 작동하고, 게임이 종료되면 타이머가 멈추게 됩니다.
- 남은 지뢰의 개수를 확인할 수 있습니다. 깃발을 세우면 남은 지뢰의 개수가 감소합니다. (실제 남은 지뢰의 개수와 일치하지 않고, 깃발이 모두 지뢰가 있는 칸에 세워졌다는 가정 하에 작동합니다.)
- 칸을 열었을 때 해당 칸과 인접한 칸들 중에 지뢰가 없다면 인접한 칸들도 모두 열립니다. (재귀적으로 주위 칸들의 지뢰 개수를 탐색합니다.)

<br/>
<br/>

### 오른쪽 클릭으로 깃발/물음표 표시

![지뢰찾기깃발물음표](https://github.com/eeeyooon/portfolio/assets/102462534/df2b5347-b141-494e-b5bf-c51e5e3cdb8d)

- 오른쪽 클릭 시 해당 칸에 깃발이 세워집니다. 그 상태에서 오른쪽 클릭을 하면 "물음표"가 표시되고 다시 한번 오른쪽 클릭을 하면 원 상태로 돌아오게 됩니다.

<br/>
<br/>

### 지뢰찾기 게임 승리

![게임승리](https://github.com/eeeyooon/portfolio/assets/102462534/ae3b9186-c8ab-41d9-ad59-927b7e1674a4)

- 지뢰가 있는 칸을 제외한 모든 칸을 열면 게임에서 승리합니다.
- 깃발이나 물음표가 있는 칸은 열리지 않은 상태입니다.

<br/>
<br/>

### 난이도 변경 및 게임 패배

![레벨변경및게임패배](https://github.com/eeeyooon/portfolio/assets/102462534/76a31f35-5958-44a6-aea4-e5466745a773)

- 난이도는 "beginner", "intermediate", "expert" 중에서 선택할 수 있습니다. 선택한 난이도에 따라 보드판의 가로, 세로 길이(칸의 수)와 지뢰의 개수가 달라집니다.
- 지뢰가 있는 칸을 열면 게임에서 패배하게 됩니다.

<br/>
<br/>

### 난이도 커스텀

![레벨커스텀](https://github.com/eeeyooon/portfolio/assets/102462534/d8825f54-9779-4bee-b2f1-ffab105e9ee1)

- 사용자가 원하는대로 가로, 세로, 지뢰 수 조정이 가능합니다.
- 설정 가능한 가로, 세로는 최대 100x100이며, 지뢰 수는 격자칸 수의 1/3 이하로만 설정이 가능합니다.

<br/>
<br/>

### 난이도 데이터 저장 (브라우저 새로고침 시 유지)

![난이도저장](https://github.com/eeeyooon/portfolio/assets/102462534/35e6adb1-ec53-4cf3-9d07-10e168c7d4ab)

`redux-persist`를 사용하여, `redux`의 `store`를 통해 관리되는 `state`를 `localStorage`에 저장하여 새로 고침을 하여도 난이도의 데이터가 저장되어 유지되도록 설정하였습니다. 난이도를 선택하고 나서 새로고침을 해도 해당 난이도로 게임을 진행할 수 있습니다.

<br/>
<br/>

<br/>

## 폴더 구조

```
📦src
┣ 📂components
┃ ┣ 📂Board
┃ ┃ ┣ 📜index.tsx
┃ ┃ ┗ 📜styles.ts
┃ ┣ 📂Cell
┃ ┃ ┣ 📜index.tsx
┃ ┃ ┗ 📜styles.ts
┃ ┣ 📂Header
┃ ┃ ┣ 📜index.tsx
┃ ┃ ┗ 📜styles.ts
┃ ┣ 📂Menu
┃ ┃ ┣ 📜index.tsx
┃ ┃ ┗ 📜styles.ts
┃ ┗ 📜index.ts
┣ 📂lib
┃ ┣ 📜constants.ts
┃ ┣ 📜findAroundMine.ts
┃ ┗ 📜initialBoard.ts
┣ 📂slices
┃ ┗ 📜gameSlice.ts
┣ 📂store
┃ ┗ 📜index.ts
┣ 📂style
┃ ┣ 📜global.ts
┃ ┗ 📜theme.ts
┣ 📜App.tsx
┣ 📜index.tsx
┗ 📜react-app-env.d.ts
```

<br/>

## 라이브러리

```
"dependencies": {
"@reduxjs/toolkit": "^2.0.1",
"@testing-library/jest-dom": "^5.17.0",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"@types/jest": "^27.5.2",
"@types/node": "^16.18.67",
"@types/react": "^18.2.42",
"@types/react-dom": "^18.2.17",
"@types/react-redux": "^7.1.32",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-redux": "^9.0.2",
"react-scripts": "5.0.1",
"redux": "^5.0.0",
"redux-persist": "^6.0.0",
"styled-components": "^6.1.1",
"styled-reset": "^4.5.1",
"typescript": "^4.9.5",
"web-vitals": "^2.1.4"
},
```

<br/>
