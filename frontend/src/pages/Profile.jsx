import { useEffect, useState } from "react";
import "../styles/profile.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/userSlice";

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

    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
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

  const handleConfirmEdit = () => {
    if (!editName.firstName || !editName.lastName) {
      alert("Please fill in both fields");
      return;
    }
    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        firstName: editName.firstName,
        lastName: editName.lastName,
      }),
    })
      .then((response) => response.json())
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

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <h1>
            Welcome back
            <br />
            <input
              className="edit-input"
              name="firstName"
              value={editName.firstName}
              onChange={handleChange}
            />
            <br />
            <input
              className="edit-input"
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
