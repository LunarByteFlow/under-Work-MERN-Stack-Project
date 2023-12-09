import React,{useState} from "react";
import axios from "axios";

const PhotoUploader = ({onChange}) => {
    const [photoLink, setphotoLink] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    

    const addPhotoByLink = async (e) => {
        e.preventDefault();
        const { data: filename } = await axios.post(
          "http://localhost:8000/api/auth/upload-by-link",
          { Link: photoLink }
        );
        setAddedPhotos((prev) => {
          return [...prev, filename];

          // return [...prev, photoLink];
        });
        // setphotoLink("");
      };
    
      const uploadImage = (e) => {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
          data.append("photos", files[i]);
        }
        axios
          .post("http://localhost:8000/api/auth/uploads", data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            const { data: filenames } = response;
            onChange(prev =>{
              return [...prev,...filenames];
            })
          });
      };


  return (
    <div>
      <>
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Photos</h1>
          <p className="text-gray-600">Add photos for a better experience.</p>
          <div className="flex">
            {" "}
            <input
              type="text"
              value={photoLink}
              onChange={(ev) => setphotoLink(ev.target.value)}
              placeholder={"Add using Link..."}
              className=" focus:border-primary focus:outline-none "
            />
            <button
              onClick={addPhotoByLink}
              className="bg-primary hover:bg-pink-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
            >
              Add Photo
            </button>
            {/* grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 */}
          </div>
          <div className=" mt-2 grid w-full gap-2  ">
            {addedPhotos.length > 0 &&
              addedPhotos.map((Link) => (
                <div key={Link}>
                  {/* `http://localhost:8000/api/uploads/` */}
                  <img
                    className="rounded-2xl"
                    src={`http://localhost:8000/api/uploads/${Link}`}
                    alt="loading..."
                  />
                </div>
              ))}
            <label className="flex cursor-pointer justify-center border gap-1 justigy-center bg-transparent rounded-2xl p-8 text-center text-2xl text-gray-600 focus:outline-none  focus:border-purple-500">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={uploadImage}
              />
              Upload
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </label>
          </div>

         
        </div>
      </>
    </div>
  );
};

export default PhotoUploader;
