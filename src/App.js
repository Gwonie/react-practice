import { useRef, useState } from "react";

import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

function App() {
  // input 상태관리
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // users 상태관리
  const [users, setUsers] = useState([
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
  ]);

  // useRef: 컴포넌트 안에서 조회 및 수정할 수 있는 변수 관리
  // useRef로 관리하는 변수 바뀐다고 리렌더링 되지 않음.
  // useState로 관리하는 변수 차이점
  // : 설정 후 바로 조회 가능
  const nextId = useRef(4);

  // users 배열에 항목 추가하기
  // "불변성" 지키면서
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    // spread 연산자 사용
    setUsers([...users, user]);
    
    // concat함수 사용: 기존 배열을 수정하지 않고,
    // 새로운 원소가 추가된 새로운 배열을 생성

    // setUsers(users.concat(user));

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  };
  // CreatUser, UserList 반환
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </>
  );
}

export default App;
