import { useRef } from "react";

import UserList from "./components/UserList";

function App() {
  const users = [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
    },
  ];

  // useRef: 컴포넌트 안에서 조회 및 수정할 수 있는 변수 관리
  // useRef로 관리하는 변수 바뀐다고 리렌더링 되지 않음.
  // useState로 관리하는 변수 차이점
  // : 설정 후 바로 조회 가능
  const nextId = useRef(4);
  const onCreate = () => {
    nextId.current += 1;
  };

  // UserList 반환
  return <UserList users={users} />;
}

export default App;
