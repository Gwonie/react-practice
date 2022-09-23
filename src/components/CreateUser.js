import React, { useEffect } from "react";

function CreateUser({ username, email, onChange, onCreate }) {
  useEffect(() => {
    console.log("CreateUser");
  });
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default React.memo(CreateUser);
// React.memo(): 컴포넌트의 props 바뀌지 않았다면,
// 리렌더링 방지해 컴포넌트 리렌더링 성능 최적화 해줌
