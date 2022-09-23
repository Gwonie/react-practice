import React, { useReducer, useState } from "react";

// useReducer 사용 이유:
// 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리 가능
// 컴포넌트 바깥/다른 파일에 작성 가능

// reducer(): 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환
function reducer(state, action) {
  switch (action.type) {
    // action: 업데이트를 위한 정보 가짐. 주로 type 값을 지닌 객체 형태
    case "INCREMENT":
      // 컴포넌트가 지닐 새로운 상태
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  // 0번째 값-state: 컴포넌트에서 사용할 수 있는 상태를 가르킴
  // 1번째 값-dispatch: 액션을 발생시키는 함수
  // e.g) dispatch({type:'INCREMET'})
  const [number, dispatch] = useReducer(reducer, 0);
  // useReducer(reducer함수, 초기상태)

  const onIncrease = () => {
    dispatch({ type: "INCREMENT" });
  };

  const onDecrease = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
