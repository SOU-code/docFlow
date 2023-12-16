import { useCallback, useEffect,useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Layout from "./../components/Layout";
// import { Box } from "@mui/material";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import CreateDocHeader from "../components/CreateDocHeader.jsx";
const CreateDoc = () => {
  // const [content, setContent] = useState("");
  // const navigate = useNavigate();
  // const id = localStorage.getItem("userId");
  // const email = localStorage.getItem("email");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("/api/v1/docs/create-doc", {
  //       content,
  //       user: id,
  //       email: email,
  //     });
  //     if (res.data.success) {
  //       toast.success(res.data.message);
  //       navigate("/my-docs");
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong!");
  //   }
  // };
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["code-block"],

    [{ header: 1 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image"], // link and image
  ];
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, {
      theme: "snow",
      //ggg
      modules: {
        toolbar: toolbarOptions,
      },
    });
  });
  return (
    <>
      <CreateDocHeader />
      <div id="container" ref={wrapperRef}></div>
    </>
  );
};

export default CreateDoc;
