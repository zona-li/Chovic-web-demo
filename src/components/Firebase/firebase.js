import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

// const prodConfig = {
//     apiKey: process.env.REACT_APP_PROD_API_KEY,
//     authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
// };

const devConfig = {
    apiKey: process.env.REACT_APP_DEV_API_KEY,
    authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
    projectId: process.env.REACT_APP_DEV_PROJECT_ID,
    storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
};

// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
const config = devConfig;
const date = new Date();
const month = date.getMonth(),
      year = date.getFullYear();
const yearlyTrackingData = {
    0: Array(new Date(year, 1, 0).getDate()).fill().map(() => 0),
    1: Array(new Date(year, 2, 0).getDate()).fill().map(() => 0),
    2: Array(new Date(year, 3, 0).getDate()).fill().map(() => 0),
    3: Array(new Date(year, 4, 0).getDate()).fill().map(() => 0),
    4: Array(new Date(year, 5, 0).getDate()).fill().map(() => 0),
    5: Array(new Date(year, 6, 0).getDate()).fill().map(() => 0),
    6: Array(new Date(year, 7, 0).getDate()).fill().map(() => 0),
    7: Array(new Date(year, 8, 0).getDate()).fill().map(() => 0),
    8: Array(new Date(year, 9, 0).getDate()).fill().map(() => 0),
    9: Array(new Date(year, 10, 0).getDate()).fill().map(() => 0),
    10: Array(new Date(year, 11, 0).getDate()).fill().map(() => 0),
    11: Array(new Date(year, 12, 0).getDate()).fill().map(() => 0),
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.serverValue = app.database.ServerValue;
        this.emailAuthProvider = app.auth.EmailAuthProvider;
        this.auth = app.auth();
        this.db = app.firestore();

        this.auth.setPersistence(app.auth.Auth.Persistence.SESSION);
        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);
    

    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);
    
    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            url: process.env.REACT_APP_DEV_CONFIRMATION_EMAIL_REDIRECT,
        });

    // *** Merge Auth and DB User API ***
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                .onSnapshot(snapshot => {
                    const dbUser = snapshot.data();

                    // default empty roles
                    if (dbUser && !dbUser.roles) {
                        dbUser.roles = [];
                    }

                    // merge auth and db user
                    authUser = {
                        uid: authUser.uid,
                        email: authUser.email,
                        emailVerified: authUser.emailVerified,
                        providerData: authUser.providerData,
                        ...dbUser,
                    };

                    next(authUser);
                });
            } else {
                fallback();
            }
        });

    
    // *** User API ***
    user = uid => this.db.collection(`users`).doc(`${uid}`);

    users = () => this.db.collection('users').get();

    // *** Habit API ***
    habits = async (uid) => {
        let allHabits = [];
        const snapshot = await this.user(uid).collection('habits').get();
        snapshot.forEach(doc => {
            allHabits.push(doc.id); // The document id is the habit name
        });
        return allHabits;
    }

    // This function adds a new habit to the database and returns a promise after the action is complete.
    addHabit = (uid, habit, category) => {
        const userInfo = this.user(uid);
        return userInfo.collection('habits').doc(habit).set({
            category: category,
            startDate: app.firestore.FieldValue.serverTimestamp(),
            ...yearlyTrackingData,
        }, { merge: true });
    }

    updateHabitTrackerEntry = (uid, habit, entryArr) => {
        const userInfo = this.user(uid);
        userInfo.collection('habits').doc(habit).set({
            [month]: entryArr
        }, { merge: true });
    }

    getHabitTrackerEntry = async (uid, habit) => {
        const userInfo = this.user(uid);
        let trackingData;
        const habitEntry = await userInfo.collection('habits').doc(habit).get();
        if (habitEntry) {
            trackingData = habitEntry.data()[month];
            console.log(trackingData)
        } else {
            console.log(`No entry for ${habit} found.`);
        }
        return trackingData;
    }

    // *** Message API ***
    message = uid => this.db.collection(`messages`).doc(`${uid}`);

    messages = () => this.db.collection('messages').get();

    // *** Application API ***
    application = applicationId => this.db.collection(`applications`).doc(`${applicationId}`);

    applications = () => this.db.collection('applications');


    // *** Payment API ***
    // '/stripe_customers/{userId}/tokens/{pushId}')
    setToken = (uid, tokenId) => this.db.collection('stripe_customers').doc(`${uid}`).collection('tokens').add({token: tokenId});

    // '/stripe_customers/{userId}/charges/{id}'
    setCharge = (uid) => this.db.collection('stripe_customers').doc(`${uid}`).collection('charges').add({amount: parseInt(200)});

    stripe_customer = uid => this.db.collection('stripe_customers').doc(`${uid}`).collection('sources').get();
}

export default Firebase;
