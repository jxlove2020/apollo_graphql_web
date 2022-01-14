# npm 초기화

```bash
npm init
```

# nodemon 설치

```bash
npm i -g nodemon
```

# index.js

```js
console.log('프로젝트 생성');
```

# package.json

```json
"scripts": {
  "start": "nodemon index.js" // 추가
}
```

# visualsutudio code extension 설치

Edit csv

# npm > convert-csv-to-json 설치

```bash
npm i convert-csv-to-json
```

# apollo 서버 설치

```bash
npm i apollo-server
```

# npm run start 로 apollo 서버 에서 쿼리 실행

http://localhost:4000 번 클릭하여
apollographql 실행 창이 열립니다.
실행창에 다음과 같이 적고 `run` 버튼을 눌러주면 실행이 됩니다.

### 조회

```
query {
  teams {
    id
    manager
    project
    supplies {
      id
    }
  }
  supplies {
    id
  }
  team(id: 3) {
    office
    extension_number
  }
  equipments {
    used_by
    count
  }
}
```

### 삭제

```
mutation {
  deleteEquipment(id: "notebook") {
    id
    used_by
    count
    new_or_used
  }
}
```

### 추가

```
mutation {
  insertEquipment (
    id: "laptop",
    used_by: "developer",
    count: 17,
    new_or_used: "new"
  ) {
    id
    used_by
    count
    new_or_used
  }
}
```

### 수정
```
mutation {
  editEquipment (
    id: "pen tablet",
    new_or_used: "new",
    count: 30,
    used_by: "designer"
  ) {
    id
    new_or_used
    count
    used_by
  }
}
```

type Mutation {
    editEquipment(
        id: String,
        used_by: String,
        count: Int,
        new_or_used: String
    ): Equipment
    ...
}