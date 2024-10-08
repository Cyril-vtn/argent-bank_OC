import { useEffect, useState } from "react";
import "../styles/profile.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { fetchUserProfile, updateUserProfile } from "../services/api.service";

export const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState({
    firstName: user.userInfo ? user.userInfo.firstName : "",
    lastName: user.userInfo ? user.userInfo.lastName : "",
  });

  useEffect(() => {
    if (user.userInfo) {
      setEditName({
        firstName: user.userInfo.firstName,
        lastName: user.userInfo.lastName,
      });
    }
  }, [user.userInfo]);

  useEffect(() => {
    if (!user.token) {
      return;
    }

    fetchUserProfile(user.token)
      .then((data) => {
        dispatch(
          setUser({
            userInfo: data.body,
            token: user.token,
          })
        );
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [user.token, dispatch]);

  const handleConfirmEdit = () => {
    if (!editName.firstName || !editName.lastName) {
      alert("Please fill in both fields");
      return;
    }

    updateUserProfile(user.token, {
      firstName: editName.firstName,
      lastName: editName.lastName,
    })
      .then((data) => {
        dispatch(
          setUser({
            userInfo: data.body,
            token: user.token,
          })
        );
        setIsEditing(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <h1>
            Welcome back
            <br />
            <label className="input-label" htmlFor="firstName">
              First Name:
            </label>
            <input
              className="edit-input"
              id="firstName"
              name="firstName"
              value={editName.firstName}
              onChange={handleChange}
            />
            <br />
            <label className="input-label" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="edit-input"
              id="lastName"
              name="lastName"
              value={editName.lastName}
              onChange={handleChange}
            />
            <br />
            <button className="edit-button" onClick={handleConfirmEdit}>
              Confirm Edit
            </button>
          </h1>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {user.userInfo
                ? `${user.userInfo.firstName} ${user.userInfo.lastName}`
                : ""}
            </h1>
            <button className="edit-button" onClick={handleEdit}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};
