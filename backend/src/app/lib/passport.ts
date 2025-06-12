import { Strategy as GitHubStrategy } from 'passport-github2';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
import { api_version, backend_port, base_url } from '../../config/config';


const prisma = new PrismaClient();


passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } })
        done(null, user)
    } catch (error) {
        done(error, null)
    }
});


// --- GOOGLE STRATEGY ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${base_url}:${backend_port}/api/${api_version}/auth/google/callback`,
},
    async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
        console.log('Google profile:', profile);
        const email = profile.emails?.[0].value;
        const emailVerified = profile.emails?.[0].verified;

        try {
            let user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                prisma.user.create({
                    data: {
                        email,
                        domain: `${email.split("@")[0]}`,
                        username: profile.displayName,
                        avatar: profile.photos?.[0]?.value,
                        isVerified: emailVerified
                    },
                }).then((created_user) => {
                    return done(null, created_user);
                });
            } else {
                return done(null, user);
            }
        } catch (error) {
            return done(error, null);
        }
    }));




// --- GITHUB STRATEGY ---
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_ID!,
    callbackURL: `${base_url}:${backend_port}/api/${api_version}/auth/github/callback`,
},
    async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
        console.log('Github profile:', profile);
        const email = profile.emails?.[0].value;
        const emailVerified = profile.emails?.[0].verified;

        try {
            let user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                prisma.user.create({
                    data: {
                        email,
                        domain: `${email.split("@")[0]}`,
                        username: profile.displayName,
                        avatar: profile.photos?.[0]?.value,
                        isVerified: emailVerified
                    },
                }).then((created_user) => {
                    return done(null, created_user);
                });
            } else {
                return done(null, user);
            }
        } catch (error) {
            return done(error, null);
        }
    }));

// // --- GITHUB STRATEGY ---
// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID!,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     callbackURL: `${process.env.AUTH_CALLBACK_URL}/github/callback`,
// }, async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
//     console.log('GitHub profile:', profile);
//     const email = profile.emails?.[0]?.value || `${profile.username}@github.fake`;

//     try {
//         let user = await prisma.user.findUnique({ where: { email } });

//         if (!user) {
//             user = await prisma.user.create({
//                 data: {
//                     email,
//                     username: profile.displayName || profile.username,
//                     avatar: profile.photos?.[0]?.value,
//                     domain: profile.username,
//                     accounts: {
//                         create: {
//                             type: 'oauth',
//                             provider: 'github',
//                             provider_account_id: profile.id,
//                         },
//                     },
//                 },
//             });
//         }

//         console.log('GitHub auth - Found/Created user:', user);
//         return done(null, user);
//     } catch (error) {
//         console.error('Error in GitHub strategy:', error);
//         return done(error, null);
//     }
// }));
