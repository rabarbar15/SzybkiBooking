import { getDatabase, ref, set, onValue, update, push, remove } from "firebase/database";
import roomsFile from "./rooms.json";
import scheduleFile from "./schedule.json";
import detailsFile from "./details.json";
import { deleteUser, getAuth, onAuthStateChanged, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";


export function importDataFromFiles() {
    const db = getDatabase();

    // detailsFile.forEach(room => {
    //   const newRoomRef = push(ref(db, 'rooms'));
    //   set(newRoomRef, room);
    // })

    // detailsFile.forEach(roomDetails => {
    //   const newRoomDetailsRef = push(ref(db, 'details'))
    //   set(newRoomDetailsRef, roomDetails)
    // })

    // set(push(ref(db, 'rooms')), roomsFile);
    // set(ref(db, 'schedule'), scheduleFile);
    // set(ref(db, 'details'), detailsFile);
}

export function retrieveAllRoomsDetails() {
  const db = getDatabase();

  return new Promise((resolve, reject) => {
    const roomRef = ref(db, 'rooms');
    onValue(roomRef, (snapshot) => {
      const roomsData = snapshot.val()
      resolve(roomsData)
    }, (error) => {
      reject(error)
    })
  })
}

export async function retrieveRoomDataByNumber(roomNumber) {
  const db = getDatabase()

  return new Promise((resolve, reject) => {
    retrieveAllRoomsDetails()
      .then((rooms) => {
        for (let key in rooms) {
          if (rooms[key].roomNumber === roomNumber) {
            // console.log(rooms[key]);
            resolve(rooms[key])
            return
          }
        }
        resolve(null)
      })
      .catch(err => {
        console.error(err);
        reject(err)
      })
  })
}

export function updateRoomDetails(roomNumber, roomData) {
  const db = getDatabase()
  const updates = {}

  return new Promise((resolve, reject) => {

    retrieveAllRoomsDetails()
      .then((rooms) => {
        for (let key in rooms) {
          if (rooms[key].roomNumber === roomNumber) {
            updates['/rooms/' + key] = roomData

            update(ref(db), updates)
              .then(() => {
                resolve(updates);
              })
              .catch((error) => {
                console.error("Error while updating room details: ", error);
                reject(error);
              });

            return
          }
        }
        resolve(null)
      })
      .catch(err => {
        console.error(err);
        reject(err)
      })
  })
}

export function addNewRoom(roomData) {
  const db = getDatabase()
  const roomsDataRef = ref(db, 'rooms')

  return new Promise((resolve, reject) => {
    push(roomsDataRef, roomData)
      .then(() => {
        // console.log("Reservation sent succesfully.");
        resolve("Room added succesfully.")
      })
      .catch((error) => {
        // console.error("Error while sending a reservation: ", error);
        reject(error)
      });
  })
}


export function deleteRoom(roomNumber) {
  const db = getDatabase()

  return new Promise((resolve, reject) => {
    retrieveAllRoomsDetails()
      .then((rooms) => {
        for (let key in rooms) {
          if (rooms[key].roomNumber === roomNumber) {
            const roomRef = ref(db, `rooms/${key}`)

            remove(roomRef)
              .then(() => {
                resolve("Room deleted successfully");
              })
              .catch((error) => {
                console.error("Error while updating room details: ", error);
                reject(error);
              });
            return
          }
        }
        resolve(null)
      })
      .catch(err => {
        reject(err)
      })
  })
}


// export function getScheduleReservations() {
//     const db = getDatabase();

//     return new Promise((resolve, reject) => {
//       const scheduleRef = ref(db, 'schedule');
//       onValue(scheduleRef, (snapshot) => {
//         const scheduleData = snapshot.val();
//         resolve(scheduleData);
//       }, (error) => {
//         reject(error);
//       });
//     });
//   }

export function getNewReservations() {
    const db = getDatabase();

    return new Promise((resolve, reject) => {
        const reservationsRef = ref(db, 'newReservations');
        onValue(reservationsRef, (snapshot) => {
            const reservationsData = snapshot.val();
            resolve(reservationsData);
        }, (error) => {
            reject(error);
        });
    });
}

export function getReservationById(reservationId) {
  const db = getDatabase();
  const reservationRef = ref(db, `newReservations/${reservationId}`)

  return new Promise((resolve, reject) => {
    onValue(reservationRef, (snapshot) => {
      const reservationData = snapshot.val();
      resolve(reservationData);
    }, (error) => {
      reject(error)
    })
  })
}

export function approveReservation(reservationId) {
  const db = getDatabase()
  const updates = {}

  return new Promise((resolve, reject) => {

    getReservationById(reservationId)
      .then(data => {

        data.status = "APPROVED"
        updates['/newReservations/' + reservationId] = data

        update(ref(db), updates)
          .then(() => {
            resolve(data)
            console.log('ero');
          })
          .catch(err => {
            reject(err)
          })
      })
  })
}

export function removeReservation(reservationId) {
  const db = getDatabase()

  return new Promise((resolve, reject) => {
    const reservationRef = ref(db, `newReservations/${reservationId}`)

    remove(reservationRef)
      .then(() => {
        resolve("Reservation removed succesfully");
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function getNewReservationsLastIndex() {
  return new Promise((resolve, reject) => {
    const reservationsRef = ref(db, 'newReservations');

    onValue(reservationsRef, (snapshot) => {
      const reservationsData = snapshot.val();
      if (reservationsData) {
        const indices = Object.keys(reservationsData).map(index => parseInt(index, 10));
        const lastIndex = Math.max(...indices);
        resolve(lastIndex);
      } else {
        resolve(null);
      }
    }, (error) => {
      reject(error);
    });
  });
}

export function addReservation(reservation) {
    const db = getDatabase();
    const reservationsRef = ref(db, 'newReservations');

    push(reservationsRef, reservation)
        .then(() => {
            console.log("Reservation sent succesfully.");
            return 1
        })
        .catch((error) => {
            console.error("Error while sending a reservation: ", error);
            return 0
        });
}


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

export const changeUserPassword = async (currentPassword, newPassword) => {
  const auth = getAuth()
  const user = auth.currentUser;

  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword)
    console.log("Password updated successfully!");
  } catch (err) {
    console.error("Error while updating a password", err);
    throw err
  }
}

export const deleteUserAccount = async (currentPassword) => {
  const auth = getAuth()
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user is currently signed in.");
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await deleteUser(user);
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error
  }
}

export function reportIssue(roomNumber, userEmail, description) {
  const db = getDatabase();
  const issuesRef = ref(db, 'issues')

  const report = {
    roomNumber: roomNumber,
    userEmail: userEmail,
    description: description,
    data: getCurrentDate()
  };

  push(issuesRef, report)
    .then(() => {
        console.log("Report sent succesfully.");
        return 1
    })
    .catch((error) => {
        console.error("Error while sending a report: ", error);
        return 0
    });
}

export function removeIssue(issueId) {
  const db = getDatabase()

  return new Promise((resolve, reject) => {
    const issueRef = ref(db, `issues/${issueId}`)

    remove(issueRef)
      .then(() => {
        resolve("Issue removed succesfully");
      })
      .catch(err => {
        reject(err);
      })
  })

}

function getCurrentDate() {
  const currentDate = new Date();
  return currentDate.toISOString().slice(0, 10);
}

export function retrieveIssues() {
  const db = getDatabase()
  
  return new Promise((resolve, reject) => {
    const issuesRef = ref(db, 'issues')

    onValue(issuesRef, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    }, (error) => {
      reject(error);
    });

  })
}
