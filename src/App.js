import React, {useEffect} from 'react';
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import ViewUser from './Components/ViewUser';
import UpdateUser from './Components/UpdateUser';
import SignOut from './Components/SignOut';
import DeleteUser from './Components/DeleteUser';
import Protect from './Components/Protect';
import AddNote from './Components/AddNote';
import EditNote from './Components/EditNote';
import NotesList from './Components/NotesList';
import SharedNoteView from './Components/SharedNoteView';

function App() {
  useEffect(() => {
    document.title = 'Notes-App';
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Protect Child={Home} />} />
          <Route path="/viewUser" element={<Protect Child={ViewUser}/>} />
          <Route path="/updateUser" element={<Protect Child={UpdateUser}/>} />
          <Route path="/deleteUser" element={<Protect Child={DeleteUser}/>} />
          <Route path="/signout" element={<Protect Child={SignOut}/>} />
          <Route path="/addNote" element={<Protect Child={AddNote}/>} />
          <Route path="/editNote" element={<Protect Child={EditNote}/>} />
          <Route path="/deleteNote" />
          <Route path="/shareNote" element={<Protect Child={NotesList} />} />
          <Route path="/share/:shareUrl" element={<SharedNoteView />} />
          </Routes>
      </Router>
      </div>
  );
}

export default App;

