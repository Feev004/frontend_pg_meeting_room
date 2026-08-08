import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Admin() {
  const [statuses, setStatuses] = useState([]);
  const navigate = useNavigate();

  // ✅ ประกาศ State ไว้ตรงนี้
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ โหลดข้อมูลเมื่อเปิดหน้า
  const loadRooms = () => {
    fetch("http://192.168.201.3:5000/api/meet")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadRooms();
  }, []);

  async function backLogin() {
    try {
      await fetch("http://192.168.201.3:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อ Server ไม่ได้");
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  async function statusRoom() {
    try {
      const response = await fetch("http://192.168.201.3:5000/api/status");
      const data = await response.json();

      console.log("Room status:", data);

      setStatuses(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function openModal(roomId) {
    document.getElementById("Editroom").style.display = "block";

    await statusRoom(); // โหลด Status ก่อน

    try {
      const response = await fetch(
        `http://192.168.201.3:5000/api/meet/${roomId}`,
      );

      const data = await response.json();

      console.log("Room data for editing:", data);
      document.getElementById("room_id").value = data[0].r_id;
      document.getElementById("room_name").value = data[0].r_name;
      document.getElementById("room_status").value = data[0].status;
      console.log(
        "test",
        "roomId:",
        data[0].r_id,
        "roomName:",
        data[0].r_name,
        "roomStatus:",
        data[0].status,
      );
    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อ Server ไม่ได้");
    }
  }
  async function Save_edit() {
    const roomId = parseInt(document.getElementById("room_id").value);
    const roomName = document.getElementById("room_name").value;
    const roomStatus = parseInt(document.getElementById("room_status").value);

    console.log(
      "roomId:",
      roomId,
      "roomName:",
      roomName,
      "roomStatus:",
      roomStatus,
    );

    try {
      const response = await fetch(
        `http://192.168.201.3:5000/api/meet/${roomId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            r_name: roomName,
            status: roomStatus,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("บันทึกข้อมูลสำเร็จ!");
        closeModal();
        loadRooms();

        // โหลดข้อมูลใหม่
        // loadProducts();
        console.log(data);
      } else {
        alert(data.message || "บันทึกข้อมูลไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อ Server ไม่ได้");
    }
  }
  function closeModal() {
    document.getElementById("Editroom").style.display = "none";
  }

  function Cancel_edit() {
    closeModal();
  }

  return (
    <>
      <header data-bs-theme="dark">
        <div className="text-bg-dark collapse" id="navbarHeader" /*style*/>
          {/* <div className="text-bg-dark collapse show" id="navbarHeader" style> */}
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4>About</h4>
                <p className="text-body-secondary">
                  Add some information about the album below, the author, or any
                  other background context. Make it a few sentences long so
                  folks can pick up some informative tidbits. Then, link them
                  off to some social networking sites or contact information.
                </p>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4>Page</h4>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-white" href="/carousel">
                      Carousel
                    </a>
                  </li>
                  <li>
                    <a className="text-white" href="/grid">
                      Grid
                    </a>
                  </li>
                  <li>
                    <a className="text-white" href="/cheatsheet">
                      Cheatsheet
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                aria-hidden="true"
                class="me-2"
                viewBox="0 0 24 24"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <strong>profile</strong>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarHeader"
              aria-controls="navbarHeader"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </header>
      <div id="Editroom" ClassName="modal_edit" style={{ display: "none" }}>
        <div>
          <h3>Edit Room</h3>
          <input type="hidden" id="room_id" />
          <input type="text" id="room_name" placeholder="Room Name" />
          <select id="room_status">
            <option value="">Select Status</option>

            {statuses.map((status) => (
              <option key={status.s_id} value={status.s_id}>
                {status.status}
              </option>
            ))}
          </select>
          <button
            style={{ width: "5%", borderRadius: "50px", margin: "5px" }}
            onClick={() => Save_edit()}
          >
            Save
          </button>
          <button
            style={{ width: "5%", borderRadius: "50px", margin: "5px" }}
            onClick={() => Cancel_edit()}
          >
            Cancel
          </button>
        </div>
      </div>
      <div>
        <div style={{ padding: "20px" }}>
          <h2>Meeting Room</h2>

          <table
            border="1"
            cellPadding="10"
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Room Name</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room.r_id}>
                  <td>{room.r_id}</td>
                  <td>{room.r_name}</td>
                  <td>{room.status}</td>
                  <td className="td-button">
                    <button
                      style={{
                        background: "#E9FF57",
                        color: "black",
                        borderRadius: "50px",
                      }}
                      onClick={() => openModal(room.r_id)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ background: "lightcoral", borderRadius: "50px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={backLogin}>Exit</button>
      </div>
    </>
  );
}

export default Admin;
