import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserDocHeader from "../components/UserDocHeader";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { FaPlus } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { MdEditNote, MdDeleteForever } from "react-icons/md";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UserDocs = () => {
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [email, setEmail] = useState("");
  const [did, setDid] = useState("");
  const [uid, setUid] = useState("");

  const getUserDocs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const res = await axios.get(`/api/v1/docs/user-doc/${id}`);

      if (res?.data.success) {
        setDocs(res?.data?.userDoc?.docs);
        setUid(res?.data?.userDoc?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(did);

  // const handleAccess = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(`/api/v1/docs/add-user/${did}`, { email });
  //     if (res?.data?.success) {
  //       alert("User added");
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getUserDocs();
  }, []);

  // console.log(docs);
  // console.log(docs?._id);

  return (
    <>
      <UserDocHeader />
      <Box className="bg-gray-300 min-h-screen w-full flex justify-center">
        <div className="w-4/5 p-5 flex flex-wrap space-x-10">
          <Link to={"/create-doc"}>
            <Card
              sx={{ width: 200, height: 250 }}
              className="flex flex-col items-center border-transparent shadow-none hover:border-2 hover:shadow-md hover:border-blue-400 hover:shadow-blue-400">
              <FaPlus className="w-32 h-32 mt-3" />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="text-center">
                  BLANK PAGE
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Start a new document</Button>
              </CardActions>
            </Card>
          </Link>
          {/* My Save Files */}
          {docs && docs.length > 0 ? (
            docs.map((doc) => (
              // Each Card
              <Card
                sx={{ width: 200, height: 250 }}
                className="flex flex-col items-center border-transparent shadow-none hover:border-2 hover:shadow-md hover:border-blue-400 hover:shadow-blue-400">
                <GrDocumentText className="w-32 h-32 mt-3" />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="text-center">
                    {/* {doc.name} */}
                    Demo Name
                  </Typography>
                </CardContent>
                <CardActions className="flex justify-between">
                  <Button Size="small" varient="contained" color="success">
                    <MdEditNote
                      className="w-5 h-5"
                      onClick={() => {
                        navigate(`/edit-doc/${doc?._id}`);
                      }}
                    />
                  </Button>
                  <Button size="small" varient="contained" color="error">
                    <MdDeleteForever
                      className="w-5 h-5"
                      onClick={async () => {
                        const res = await axios.delete(
                          `/api/v1/docs/delete-doc/${doc?._id}`
                        );
                        if (res?.data.success) {
                          alert("Document deleted");
                          window.location.reload();
                        }
                      }}
                    />
                  </Button>
                </CardActions>
              </Card>
              // <div>
              //   {doc.content}
              //   {localStorage.getItem("userId") === uid && (
              //     <>
              //       <button
              //         onClick={() => {
              //           navigate(`/edit-doc/${doc?._id}`);
              //         }}>
              //         edit
              //       </button>
              //       <button
              //         onClick={async () => {
              //           const res = await axios.delete(
              //             `/api/v1/docs/delete-doc/${doc?._id}`
              //           );
              //           if (res?.data.success) {
              //             alert("Document deleted");
              //             window.location.reload();
              //           }
              //         }}>
              //         delete
              //       </button>
              //     </>
              //   )}
              // </div>
            ))
          ) : (
            <h1>No Documents found</h1>
          )}
        </div>
      </Box>
    </>
  );

  // <Layout>
  //   {docs && docs.length > 0 ? (
  //     docs.map((doc) => (
  //       <div>
  //         {doc.content}
  //         {localStorage.getItem("userId") === uid && (
  //           <>
  //             <button
  //               onClick={() => {
  //                 navigate(`/edit-doc/${doc?._id}`);
  //               }}
  //             >
  //               edit
  //             </button>
  //             <button
  //               onClick={async () => {
  //                 const res = await axios.delete(
  //                   `/api/v1/docs/delete-doc/${doc?._id}`
  //                 );
  //                 if (res?.data.success) {
  //                   alert("Document deleted");
  //                   window.location.reload();
  //                 }
  //               }}
  //             >
  //               delete
  //             </button>
  //             <form onSubmit={handleAccess}>
  //               <div className="mb-3">
  //                 <input
  //                   type="text"
  //                   value={email}
  //                   onChange={(e) => setEmail(e.target.value)}
  //                   className="form-control"
  //                   placeholder="Email"
  //                   required
  //                 />
  //               </div>

  //               <button
  //                 type="submit"
  //                 onClick={() => setDid(doc?._id)}
  //                 className="btn btn-primary"
  //               >
  //                 Give Access
  //               </button>
  //               <button
  //                 onClick={() => {
  //                   navigate(`/view-doc/${doc?._id}`);
  //                 }}
  //               >
  //                 share
  //               </button>
  //             </form>
  //           </>
  //         )}
  //       </div>
  //     ))
  //   ) : (
  //     <h1>No Documents found</h1>
  //   )}
  // </Layout>
  // );
};

export default UserDocs;
