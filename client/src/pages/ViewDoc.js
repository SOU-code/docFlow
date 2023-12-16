import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";

const ViewDoc = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const [doc, setDoc] = useState({});

  const id = useParams().id;

  var emails = doc?.email;

  var urlShare = window.location.href;

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

  // function copyUrl() {
  //   navigator.clipboard.writeText(urlShare);
  //   alert("Link copied to clipboard");
  // }

  useEffect(() => {
    getDocDetails();
  }, [id]);

  return (
    <>
      {isLogin && (
        <Layout>
          <div className="form-container">
            <h4 className="title">Document</h4>

            <div className="mb-3">
              <input
                type="text"
                value={doc?.content}
                className="form-control"
                placeholder="Content"
                readOnly="readonly"
              />
            </div>
          </div>
          {emails && emails.map((d) => <h4>{d}</h4>)}
          <h4>Copy URL : </h4>
          <a href={urlShare}>{urlShare}</a>
        </Layout>
      )}
      {!isLogin && alert("Login to see the document")}
    </>
  );
};

export default ViewDoc;
