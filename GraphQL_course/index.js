import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";

// db
import db from "./_db.js";

// types
import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find(review => review.id === args.id);
    },
    game(_, args) {
      return db.games.find(game => game.id === args.id);
    },
    author(_, args) {
      return db.authors.find(author => author.id === args.id);
    },
  },

  // 👇 Game resolvers should be at top-level, not inside Query
  Game: {
    reviews(parent) {
      return db.reviews.filter(r => r.gameId === parent.id);
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter(r => r.authorId === parent.id);
    }
  },
  Review: {
    author(parent) {
      return db.authors.find(author => author.id === parent.authorId);
    },
    game(parent) {
      return db.games.find(game => game.id === parent.gameId);
    }
  },
  Mutation: {
    deleteGame(parent, args) {
      db.games = db.games.filter(game => game.id !== args.id);
      return db.games;
    },
    addGame(parent, args) {
        let game = {
            ...args.game,
            id: Math.floor(Math.random() * 10000)
        }
        db.games.push(game);
        return game;
    },
    updateGame(parent, args) {
        db.games = db.games.map(game => {
            if (game.id === args.id) {
                return {
                    ...game,
                    ...args.edits
                }
            }
            return game;
        })
        return db.games.find(game => game.id === args.id);
    }
  }
}

// sever setup
const server = new ApolloServer({
    typeDefs, 
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen: { port: 4000}
})

console.log(`Server is running at ${url}`)  