const database = require('./database');
const { ApolloServer, gql } = require('apollo-server');
// GraphQL 명세에서 사용될 데이터, 요청의 타입 지정
// gql ( template literal tag로 생성됨 )
const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipment]
    supplies: [Supply]
  }
  type Mutation {
    insertEquipment(
      id: String
      used_by: String
      count: Int
      new_or_used: String
    ): Equipment
    editEquipment(
      id: String
      used_by: String
      count: Int
      new_or_used: String
    ): Equipment
    deleteEquipment(id: String): Equipment
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
  type Equipment {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }
  type Supply {
    id: String
    team: Int
  }
`;
// 서비스의 액션들을 함수로 지정
// 요청에 따라 데이터를 반환, 입력, 수정, 삭제
const resolvers = {
  // database.teams 라는 항목을 반환하는 함수
  Query: {
    teams: () =>
      database.teams.map(team => {
        team.supplies = database.supplies.filter(supply => {
          return supply.team === team.id;
        });
        return team;
      }),
    team: (parent, args, context, info) =>
      database.teams.filter(team => {
        return team.id === args.id;
      })[0],
    equipments: () => database.equipments,
    supplies: () => database.supplies,
  },
  Mutation: {
    insertEquipment: (parent, args, context, info) => {
      database.equipments.push(args);
      return args;
    },
    editEquipment: (parent, args, context, info) => {
      return database.equipments
        .filter(equipment => {
          return equipment.id === args.id;
        })
        .map(equipment => {
          Object.assign(equipment, args);
          return equipment;
        })[0];
    },
    deleteEquipment: (parent, args, context, info) => {
      const deleted = database.equipments.filter(equipment => {
        return equipment.id === args.id;
      })[0];
      database.equpments = database.equipments.filter(equipment => {
        return equipment.id !== args.id;
      });
      return deleted;
    },
  },
};
// 아폴로 서버
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
