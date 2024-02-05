import { createContext, useContext, useEffect, useState } from "react";
import { auth, database, dbRef } from "../misc/firebase";
import { child, get, getDatabase, onValue, ref } from 'firebase/database';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(authObj => {

            if (authObj) {

                // //TODO(AA) : Method 1
                // let userRef = dbRef(database, "users",authObj)

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

                const databaseRef = ref(getDatabase());
                get(child(databaseRef, `/users/${authObj.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        //console.log(snapshot.val());
                        const { displayName, email, uid, avatar } = snapshot.val();
                        const data = {
                            uid: uid,
                            avatar:avatar,
                            email: email,
                            name: displayName
                        }
                        console.log('profielData', data)
                        setProfile(data);
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                setProfile(null);
            }
        })
    }, [])

    return <ProfileContext.Provider value={profile}>
        {children} 
    </ProfileContext.Provider>

}

export const useProfile = () => useContext(ProfileContext)