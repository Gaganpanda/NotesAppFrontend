import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { Table } from "reactstrap";
import ShareButton from "./ShareButton";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const editNotes = (id) => {
        axios.get(`https://notesapp-backend-latest.onrender.com/notes/${id}`)
            .then((res) => {
                localStorage.setItem("note", JSON.stringify(res.data.data));
                navigate("/editNote");
            })
            .catch(() => {
                alert("Something went wrong");
            });
    };

    const deleteNotes = (id) => {
        axios.delete(`http://notesapp-backend-latest.onrender.com/notes/${id}`)
            .then((res) => {
                alert(res.data.data);
                // Refresh notes after delete
                setNotes(notes.filter(n => n.id !== id));
                setSearch(search.filter(n => n.id !== id));
            })
            .catch(() => {
                alert("Cannot Delete Note");
            });
    };

    useEffect(() => {
        const fetchData = () => {
            axios.get(`http://notesapp-backend-latest.onrender.com/notes/byUser-ID/${user.id}`)
                .then((res) => {
                    setNotes(res.data.data);
                    setSearch(res.data.data);
                })
                .catch(() => {
                    alert("Bad Request");
                });
        };
        fetchData();
    }, [user.id]);

    const searchNotes = (e) => {
        setSearch(
            notes.filter((x) =>
                x.title.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    return (
        <div>
            <Navbar />
            <input
                type="text"
                placeholder="Search Note By Title"
                onChange={searchNotes}
            />
            <div>
                <Table responsive size="sm" dark cellPadding={20}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Note</th>
                            <th>Date</th>
                            <th>EDIT</th>
                            <th>DELETE</th>
                            <th>SHARE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {search.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.title}</td>
                                <td>{p.content}</td>
                                <td>{p.date}</td>
                                <td>
                                    <button
                                        onClick={() => editNotes(p.id)}
                                        className={style.btn}
                                    >
                                        EDIT
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => deleteNotes(p.id)}
                                        className={style.btn}
                                        style={{
                                            backgroundColor: "crimson",
                                            width: 70,
                                        }}
                                    >
                                        DELETE
                                    </button>
                                </td>
                                <td>
                                    <ShareButton
                                        shareUrl={p.shareUrl}
                                        className={style.btn}
                                        style={{
                                            backgroundColor: "purple",
                                            color: "white",
                                            width: 70,
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
export default Home;
