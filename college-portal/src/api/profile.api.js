import { db } from "../firebase.config";

import {
  collection,
  query,
  where,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";

//TODO Add notifications

export const getDetails = (
  user,
  setDocId,
  setCname,
  setDomain,
  setCollegeScholarships,
  setLoading,
  setError
) => {
  try {
    const l = [];
    const q =
      user.email === "gov@govindia.in"
        ? query(collection(db, "colleges"))
        : query(
            collection(db, "colleges"),
            where("domain", "==", user.email.split("@")[1])
          );
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setDocId(doc.id);
        setCname(doc.data().cname);
        setDomain(doc.data().domain);
        doc.data().scholarships?.forEach((item) => {
          l.push(item.name);
        });
        setCollegeScholarships(l);
      });
      setLoading(false);
    });
  } catch (err) {
    setError(err);
  }
};

export const getScholarship = (
  collegeScholarships,
  setScholarships,
  setError
) => {
  try {
    const q = query(
      collection(db, "scholarships"),
      where("scholarshipName", "not-in", collegeScholarships)
    );
    onSnapshot(q, (querySnapshot) => {
      setScholarships(
        querySnapshot.docs.map((scholarship) => ({
          value: scholarship.data().scholarshipName,
          label: scholarship.data().scholarshipName,
          provider: scholarship.data().scholarshipProvider,
          description: scholarship.data().scholarshipDescription,
        }))
      );
    });
  } catch (err) {
    setError(err);
    console.log(err);
  }
};

export const scholarshipSubmit = async (
  docid,
  newScholarship,
  Notifications
) => {
  try {
    await updateDoc(doc(db, "colleges", docid), {
      scholarships: arrayUnion({
        name: newScholarship.name,
        description: newScholarship.description,
        provider: newScholarship.provider,
      }),
    });
    console.log(newScholarship.name + " added to database.");
  } catch (err) {
    Notifications(
      `${newScholarship.name} was not added to database. Please try again`
    );
  }
};

export const submitCollegeDetails = async (
  docid,
  cname,
  begin,
  end,
  setError
) => {
  try {
    await updateDoc(doc(db, "colleges", docid), {
      cname: cname,
      class_begin: begin,
      class_end: end,
    });
  } catch (err) {
    setError(err);
  }
};

export const getScholarships = async (
  user, 
  setScholarships
) => {
  try {
    const q = user.email === "gov@govindia.in"
    ? query(collection(db, "scholarships"))
    : query(
      collection(db, "colleges"),
      where("domain", "==", user.email.split("@")[1])
    );
    const querySnapshot = await getDocs(q);
    user.email === "gov@govindia.in" 
      ? setScholarships(
          querySnapshot.docs.map((scholarship) => (
            {
              name: scholarship.data().scholarshipName,
              provider: scholarship.data().scholarshipProvider,
              description: scholarship.data().scholarshipDescription
            }
          ))  
        )
      : setScholarships(
      querySnapshot.docs[0].data().scholarships?.map((scholarship) =>
        // console.log(scholarship);
        ({
          name: scholarship.name,
          provider: scholarship.provider,
          description: scholarship.description,
        })
      )
    );
  } catch (err) {
    console.log(err);
  }
}

export const getStudents = async (
  id,
  setData
) => {
  const docRef = doc(db, "students", id);
      onSnapshot(docRef, (docSnap) => {
        setData({
          id: docSnap.id,
          student: docSnap.data(),
        });
      })
}