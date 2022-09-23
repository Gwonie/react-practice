import React, { useEffect } from "react";

// UserList > User

// 컴포넌트 리렌더링 조건

const User = React.memo(function User({ user, onRemove, onToggle }) {
  // useEffet 사용해 마운트/언마운트/언데이트시 할 작업 설정
  // 마운트: 처음 나타날 때
  // 언마운트: 사라질 때
  useEffect(() => {
    // console.log("컴포넌트가 화면에 나타남");
    console.log("User");
    return () => {
      // clenup함수
      //   console.log("컴포넌트가 화면에서 사라짐");
    };
  }, []);

  // 업데이트: 특정 props가 바뀔때
  // 규칙:
  // useEffect 안에서 사용하는 상태나, props가
  // 최신 props/상태를 가르키기 위해
  // useEffect의 deps에 넣어주어야 함.
  // 삭제될 때도 함수 실행
  //   useEffect(() => {
  //     console.log("user 값이 설정됨");
  //     console.log(user);
  //     return () => {
  //       console.log("user 가 바뀌기 전..");
  //       console.log(user);
  //     };
  //   }, [user]);

  // deps파라미터 생략 -> 컴포넌트 리렌더링 될 떄마다 호출
  //   useEffect(() => {
  //     console.log(user);
  //   });
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  useEffect(() => {
    console.log("UserList");
  });
  return (
    <div>
      {users.map((user) => (
        // User반환
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);
