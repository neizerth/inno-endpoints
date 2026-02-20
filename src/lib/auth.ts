import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { prisma } from './prisma.js';

passport.use(
  new BasicStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user || user.password !== password) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export const authenticate = passport.authenticate('basic', { session: false });

export default passport;
