import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";
import { onValue, ref } from 'firebase/database';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let userRef;
        const authUnsub = auth.onAuthStateChanged(authObj => {

            if (authObj) {
                // //TODO(AA) : Method 1
                //  let userRef = dbRef(database, "users",authObj)

                // onValue(userRef,(snapshot) => {
                //     const {displayName,email,uid} = snapshot.val();
                //     const data = {
                //         uid:uid,
                //         email: email,
                //         name:displayName
                //     }
                //     console.log('profielData', data)
                //     setProfile(data);
                // });

                // TODO(AA) : Method 2
                // let refObj = ref(database, `/users/${authObj.uid}`)

                // onValue(refObj, (snapshot) => {
                //     const profileData = snapshot.val();
                //     console.log('snap', profileData)
                //   });

                // TODO(AA) : Method 3
                // FIXME(SK) : message.....
                // const databaseRef = ref(database);

                userRef = ref(database, `/users/${authObj.uid}`)
                onValue(userRef, (snapshot) => {
                    const { displayName, email, uid, avatar } = snapshot.val();
                    const data = {
                        uid: uid,
                        email: email,
                        name: displayName,
                        avatar: avatar
                    }
                    console.log('profielData', data)
                    setProfile(data);
                    setIsLoading(false);
                });
            } else {
                if (userRef) {
                    userRef.off();
                }
                console.log("No data available");
                setProfile(null);
                setIsLoading(false)
            }
        });
        return () => {
            authUnsub();
            if (userRef) {
                userRef.off();
            }
        }
    }, []);

    return (<ProfileContext.Provider value={{ isLoading, profile }}>
        {children}
    </ProfileContext.Provider>)

};

export const useProfile = () => { return useContext(ProfileContext) }