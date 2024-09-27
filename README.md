# vue2-rps-game

# 구성
 - ## index_.html
   **기본 CDN 방식으로 하나의 html파일에서 싱글 컴포넌트 형태로 구현**
   - index_.js 파일을 참조하여 Vue 인스턴스를 정의한다.
     - 해당 파일에서 Vue의 속성과 훅을 선언하여 사용한다.
 - ## _index.html
   **CDN 방식에서 재사용성을 고려한 레이아웃을 .js확장자로 컴포넌트 파일 구현**
   - Vue.js로 최상위 Vue 인스턴스를 선언한 뒤 index.html에서 참조한다.
   - Vue 컴포넌트를 선언하여 .js확장자로 컴포넌트를 구성한 뒤 index.html에서 참조한다.
     - jsx문법을 template 속성에 `백틱` 구분자로 작성한다.
       - `Vue VSCode Snippets` 플러그인 설치 후 index.js에 `const html = String.raw;`   
       코드를 선언. 각 컴포넌트의 백틱 기호 앞에 html을 선언하여 html 구문 강조 적용.
 - ## index.html  
   **CDN 방식에서 import 참조구문을 통한 컴포넌트 참조 방식이 적용된 최종본**
     - 기존 _index.html의 jsx 구문강조 적용 유지
     - 각 컴포넌트들이 참조 가능하도록 export default 구문을 적용.  
     -  Root컴포넌트인 root.js에서 import 구문으로 참조 및 componets 속성 등록
     - ***ES module 방식의 경우 서버로 실행하지 않는다면 CORS 에러 발생 → LiveServer로 실행***