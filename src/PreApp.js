import { useRef, useState, useMemo, useCallback, useEffect } from "react";

import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import Counter from "./components/Counter";

// App > CreateUser == UserList

// users에 변화있을 때가 아닌, input값이 바뀔 때에도 컴포넌트가 리렌더링돼 useMemo 사용
// memoized: 이전 "계산" 값 재사용
function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

function App() {
  useEffect(() => {
    // console.log("App");
  });
  // input 상태관리
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  }, []);

  // users 상태관리
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ]);

  // useRef: 컴포넌트 안에서 조회 및 수정할 수 있는 변수 관리
  // useRef로 관리하는 변수 바뀐다고 리렌더링 되지 않음.
  // useState로 관리하는 변수 차이점
  // : 설정 후 바로 조회 가능
  const nextId = useRef(4);

  // users 배열에 항목 추가하기
  // "불변성" 지키면서
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    // spread 연산자 사용
    setUsers((users) => [...users, user]);

    // concat함수 사용: 기존 배열을 수정하지 않고,
    // 새로운 원소가 추가된 새로운 배열을 생성

    // setUsers(users.concat(user));

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [username, email]);

  // users 배열에 항목 제거하기
  // filter(): 배열에서 특정 조건이 만족하는 원소들만 추출하여 새로운 배열 반환
  const onRemove = useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  // users 배열에 항목 수정하기
  // map함수 사용
  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);

  // useCallback: 특정 함수 재사용하고 싶을 때 사용
  // 함수들이 컴포넌트가 리렌더링될 때마다 새로 만들어짐 -> useCallback 사용하여 최적화
  // deps 배열 안에 함수 안에서 사용하는 상태/props를 포함시키는 거 필수

  const count = useMemo(() => countActiveUsers(users), [users]);
  // 배열 내용 바뀜 ? 함수 호출 해 값 연산 : 이전 연산값 재사용

  // CreatUser, UserList 반환
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
      <Counter />
    </>
  );
}

export default App;

// 함수형 업데이트
// React.memo 사용 후...
// deps에 users가 들어가 있어서 배열이 바뀔 때마다 함수가 생성됨
// -> deps에서 users 지우고, useState로 관리하는 users 참조하지 않게함
// setUsers에 등록하는 콜백함수의 파라미터에서 최신 users 참조 가능
