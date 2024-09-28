# vue2-rps-game

# *구성*
 - ### `index_.html`
   **기본 CDN 방식으로 하나의 html파일에서 싱글 컴포넌트 형태로 구현**
   - index_.js 파일을 참조하여 Vue 인스턴스를 정의한다.
     - 해당 파일에서 Vue의 속성과 훅을 선언하여 사용한다.
 - ### `_index.html`
   **CDN 방식에서 재사용성을 고려한 레이아웃을 .js확장자로 컴포넌트 파일 구현**
   - Vue.js로 최상위 Vue 인스턴스를 선언한 뒤 index.html에서 참조한다.
   - Vue 컴포넌트를 선언하여 .js확장자로 컴포넌트를 구성한 뒤 index.html에서 참조한다.
     - jsx문법을 template 속성에 `백틱` 구분자로 작성한다.
       - `Vue VSCode Snippets` 플러그인 설치 후 index.js에 `const html = String.raw;`   
       코드를 선언. 각 컴포넌트의 백틱 기호 앞에 html을 선언하여 html 구문 강조 적용.
 - ### `index.html`  
   **CDN 방식에서 import 참조구문을 통한 컴포넌트 참조 방식이 적용된 최종본**
     - 기존 _index.html의 jsx 구문강조 적용 유지
     - 각 컴포넌트들이 참조 가능하도록 export default 구문을 적용.  
     -  Root컴포넌트인 root.js에서 import 구문으로 참조 및 componets 속성 등록
     - ***ES module 방식의 경우 서버로 실행하지 않는다면 CORS 에러 발생 → LiveServer로 실행***


# *Data Property*
컴포넌트 또는 인스턴스에서 관리되는 반응형(react) 상태(state)를 의미한다.  
이러한 상태는 Vue의 핵심 기능인 양방향 바인딩을 통해 DOM과 동기화 된다.  

data는 컴포넌트 또는 인스턴스 내의 상태(state)를 저장한다.  
상태는 컴포넌트가 렌더링 될 때 필요한 정보나 값으로, UI에서 사용자의 상호작용이나 데이터 변화를 처리하는데 필수적이다.  

Vue는 이러한 data에 정의된 모든 속성을 반응형으로 변환한다.  
반응형이란 해당 속성의 값이 변경될 때 그 값을 사용하는 모든 Vue 템플릿 또는 컴포넌트가 자동으로 리랜더링 된다는 것을 의미한다.  
이러한 반응성 덕분에 개발자는 DOM을 직접 업데이트할 필요 없이, 데이터만 업데이트 하면  Vue가 DOM을 자동으로 업데이트 하게 된다.

data의 형태(타입)는 new Vue()와 Vue.component 두가지 경우에 따라 달라진다.

### 객체형태 - new Vue()
객체로 선언되며 Vue 인스턴스에서 하나의 data 객체를 공유한다.  
Vue 인스턴스는 일반적으로 한번만 생성되며, data에 선언된 속성들이 Vue 인스턴스의 상태로 관리된다.  
Vue 인스턴스느 그 자체로 하나의 애플리케이션이므로 data는 단일 객체로 구성된다.
```js
new Vue({
  el: '#app',
  data: {
    msg: "Hello Vue!"
  }
})
```

### 함수형태 - Vue.component()
함수로 선언된다.  
Vue 컴포넌트는 재사용이 가능하므로, 각 컴포넌트 인스턴스가 고유한 data 객체를 가져야 한다.  
그렇지 않으면 여러 인스턴스가 동일한 data 객체를 공유하게 되어 의도치 않은 상태 공유가 발생할 수 있다.  
함수로 선언된 data()는 호출될 때마다 새로운 data객체를 반환하여 각 컴포넌트 인스턴스가 독립적인 상태를 유지할 수 있도록 한다.

```js
const html = String.raw; 

Vue.component('my-component', {
  template: html'<div>{{ message }}</div>',
  data() {
    return {
      message: 'Hello from component!'
    };
  }
});
```

## 차이점 정리
 - Vue 인스턴스는 애플리케이션 내에서 단 하나만 생성되므로 상태 공유가 문제되지 않는다.
 - Vue 컴포넌트는 여러 인스턴스가 생성될 수 있기 때문에 각 인스턴스 마다 고유한 상태를 유지할 필요가 있다.  
 이를 위해 data()와 같이 함수로 선언되어, 호출 시 새로운 객체를 반환하게 되는 것이다.  

이러한 차이점은 컴포넌트의 재사용성과 상태 독립성을 보장히기 위한 설계의 차이이다.