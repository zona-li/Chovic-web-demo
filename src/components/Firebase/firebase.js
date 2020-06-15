import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { yearlyTrackingData } from '../../constants/initialHabitData';

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
  confirmationEmailRedirect:
    process.env.REACT_APP_PROD_CONFIRMATION_EMAIL_REDIRECT,
};

const devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
const date = new Date();
const month = date.getMonth();

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.serverValue = firebase.database.ServerValue;
    this.emailAuthProvider = firebase.auth.EmailAuthProvider;
    this.auth = firebase.auth();
    this.db = firebase.firestore();

    this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doUpdateProfile = (profile) => this.auth.currentUser.updateProfile(profile);

  doSendEmailVerification = () => {
    const res = this.auth.currentUser.sendEmailVerification({
      url: 'https://chovic.com/home',
    });
    return res;
  };

  // *** Merge Auth and DB User API ***
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const userDoc = this.user(authUser.uid).get();
        userDoc.then((doc) => {
          if (doc) {
            const data = doc.data();
            const emailVerified = data?.emailVerified;
            if (!emailVerified) {
              this.user(authUser.uid).update({
                emailVerified: authUser.emailVerified,
              });
            }

            if (data && !data.roles) data.roles = [];
            authUser = {
              ...data,
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
            };

            next(authUser);
          }
        });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = (uid) => this.db.collection(`users`).doc(`${uid}`);

  users = () => this.db.collection('users').get();

  // *** Habit API ***
  getAllHabits = async (uid) => {
    const allHabits = {};
    const snapshot = await this.user(uid).collection('habits').get();
    snapshot.forEach((doc) => {
      allHabits[doc.id] = doc.data();
    });
    return allHabits;
  };

  // This function adds a new habit to the database and returns a promise after the action is complete.
  addHabit = (uid, habit, category) => {
    const userInfo = this.user(uid);
    return userInfo
      .collection('habits')
      .doc(habit)
      .set(
        {
          category: category,
          startDate: firebase.firestore.FieldValue.serverTimestamp(),
          ...yearlyTrackingData,
        },
        { merge: true }
      );
  };

  deleteHabit = (uid, habit) => {
    const userInfo = this.user(uid);
    // Test sending email
    this.db
      .collection('emails')
      .add({
        to: 'haoyang.zona@gmail.com',
        message: {
          subject: 'Welcome to Chovic!',
          html:
            '<body><p>Thank you for signing up for Chovic! We are excited to embark on this journey with you. Our team is working hard to provide the best product for you to easily build and track your habits, connect with your friends for mutual support, and learn the mental models that lead to long-term success. To get started, log in and head to our <a style="color: steelblue; text-decoration: none;" href="https://chovic.com/home" target="_blank">habit page</a>. You can add a habit that you want to build upon and keep track of on that page. Our calendar will give you an overview of your monthly progress. We are working on adding more functionalities to our product, including an iOS and Android app with a habit coach! Stay tuned for our emails on the future product updates!</p><p>Best,<br />Your Chovic Team</p></body>',
        },
      })
      .then(() => console.log('Queued email for delivery!'));
    // Finish sending email

    return userInfo.collection('habits').doc(habit).delete();
  };

  updateHabitTrackerEntry = (uid, habit, monthSelected, entryArr) => {
    const userInfo = this.user(uid);
    userInfo
      .collection('habits')
      .doc(habit)
      .set(
        {
          [monthSelected]: entryArr,
        },
        { merge: true }
      );
  };

  getHabitTrackerEntry = async (uid, habit) => {
    const userInfo = this.user(uid);
    let trackingData;
    const habitEntry = await userInfo.collection('habits').doc(habit).get();
    if (habitEntry) {
      trackingData = habitEntry.data()[month];
    } else {
      console.log(`No entry for ${habit} found.`);
    }
    return trackingData;
  };

  // *** Message API ***
  message = (uid) => this.db.collection(`messages`).doc(`${uid}`);

  messages = () => this.db.collection('messages').get();

  // *** Application API ***
  application = (applicationId) =>
    this.db.collection(`applications`).doc(`${applicationId}`);

  applications = () => this.db.collection('applications');

  // *** Payment API ***
  // '/stripe_customers/{userId}/tokens/{pushId}')
  setToken = (uid, tokenId) =>
    this.db
      .collection('stripe_customers')
      .doc(`${uid}`)
      .collection('tokens')
      .add({ token: tokenId });

  // '/stripe_customers/{userId}/charges/{id}'
  setCharge = (uid) =>
    this.db
      .collection('stripe_customers')
      .doc(`${uid}`)
      .collection('charges')
      .add({
        amount: parseInt(500),
      });

  // Check whether the source (card) information is written to the database, need to verify this before charging customer.
  getSourceDocs = (uid) =>
    this.db
      .collection('stripe_customers')
      .doc(`${uid}`)
      .collection('sources')
      .get();

  // Check whether a given user has paid for being a member
  checkPayment = (uid) =>
    this.db
      .collection('stripe_customers')
      .doc(`${uid}`)
      .collection('charges')
      .get();
}

export default Firebase;
