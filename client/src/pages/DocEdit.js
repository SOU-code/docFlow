import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

const DocEdit = () => {
  const navigate = useNavigate();
  const [doc, setDoc] = useState({});

  const id = useParams().id;
  var email = localStorage.getItem("email");

  var emails = doc?.email;

  const getDocDetails = async () => {
    try {
      const res = await axios.get(`/api/v1/docs/get-doc/${id}`);
      if (res?.data.success) {
        setDoc(res?.data?.doc);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/v1/docs/update-doc/${id}`, {
        content: doc,
        user: localStorage.getItem("userId"),
      });
      if (res.data.success) {
        navigate("/my-docs");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocDetails();
  }, [id]);

  //   console.log(doc);
  // console.log(emails);

  if (Array.isArray(emails) && emails.length > 0) {
    var a1 = emails.indexOf(email);
  }

  return (
    <>
      {/* localStorage.getItem("email") === doc?.email */}
      {a1 !== -1 && (
        <Layout>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h4 className="title">Edit Document</h4>

              <div className="mb-3">
                <input
                  type="text"
                  value={doc?.content}
                  onChange={(e) => setDoc(e.target.value)}
                  className="form-control"
                  placeholder="Content"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
            {/* {a1} */}
          </div>
          {emails && emails.map((d) => <h4>{d}</h4>)}
          {/* after updating emails are did not showing */}
        </Layout>
      )}
      {"You dont have the access"}
    </>
  );
};

export default DocEdit;
