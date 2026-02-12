import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GroupsPage.css";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/groups/my",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGroups(res.data);
    };
    fetchGroups();
  }, [token]);

  const handleCreate = async () => {
    if (!groupName) return;

    const res = await axios.post(
      "http://localhost:3000/api/groups",
      { name: groupName },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setGroups([...groups, res.data]);
    setGroupName("");
    setShowModal(false);
  };

  return (
    <div className="groups-container">
      <div className="groups-header">
        <h1>Your Groups</h1>
        <button className="create-btn" onClick={() => setShowModal(true)}>
          + Create Group
        </button>
      </div>

      <div className="groups-grid">
        {groups.map(group => (
          <div
            key={group._id}
            className="group-card"
            onClick={() => navigate(`/groups/${group._id}`)}
          >
            <div className="group-card-header">
              <h3>{group.name}</h3>
            </div>
            <p className="group-code">Code: {group.code}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New Group</h2>
            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="primary" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
