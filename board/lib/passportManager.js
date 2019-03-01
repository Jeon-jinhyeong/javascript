
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = (passport) => {
    // ?
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // ?
    passport.deserializeUser((id, done) => {
        User.find({ where : { id }})
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    // ?
    useLocalStrategy(passport);
};


function useLocalStrategy (passport) {
    passport.use('local', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    }, async (email, password, done) => {
        try {
            const user = await User.find({ where : { email } });
            if (user) {
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    done(null, user);
                } else {
                    done(null, false, { message : '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message : '가입되지 않은 회원입니다.' });
            }
        } catch (error) {
            done(error);
        }
    }));
};
