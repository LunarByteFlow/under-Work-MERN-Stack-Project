import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";
import PhotoUploader from "./PhotoUploader";
import { useNavigate } from "react-router-dom";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [perks, setPerks] = useState("");
  const [photoLink, setphotoLink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [description, setDescription] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState("");

  let navigate = useNavigate();

  const addNewPlace = () => {
    const data = {
      title,
      address,
      addedPhotos,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      perks,
      description,
    };
    axios.post(`http://localhost:8000/api/auth/places`, data);
    navigate("account/places");
  };

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

  return (
    <>
      <div>
        {action !== "new" && (
          <div className=" text-center my-3">
            <Link
              to="/account/my-places/new"
              className="bg-primary text-white py-2 px-4 rounded-full inline-flex  "
            >
              Add New Place
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Link>
          </div>
        )}

        {action === "new" && (
          <div>
            <form onSubmit={addNewPlace} className="max-w-md mx-auto my-3">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-lg font-semibold text-gray-800"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(ev) => setTitle(ev.target.value)}
                  placeholder="Enter a title (e.g., My Lovely Apartment)"
                  className="w-full py-2 px-3 border rounded focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-lg font-semibold text-gray-800"
                >
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(ev) => setAddress(ev.target.value)}
                  placeholder="Enter the address"
                  className="w-full py-2 px-3 border rounded focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <>
                  <div className="mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                      Photos
                    </h1>
                    <p className="text-gray-600">
                      Add photos for a better experience.
                    </p>
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
                          // onChange={uploadImage}
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

             

              <h2 className="text-2xl mt-4">Enter Description</h2>
              <p className="text-gray-500 text-sm">About your Location...</p>
              <textarea
                className="focus:outline-none focus:border-primary"
                value={description}
                placeholder="Enter description"
                onChange={(ev) => setDescription(ev.target.value)}
              />

              <h2 className="text-2xl mt-4">Extra Info</h2>
              <p className="text-gray-500 text-sm">House rules, etc...</p>
              <textarea
                className="focus:outline-none focus:border-primary"
                value={extraInfo}
                onChange={(ev) => setExtraInfo(ev.target.value)}
              />
              <Perks selected={perks} onChange={setPerks} />
              <h2 className="text-2xl mt-4">Check in&out times</h2>
              <p className="text-gray-500 text-sm">
                Add check in and out time , remember to clean the room before
                checkout
              </p>
              <div>
                <div>
                  <h3 className="mt-2 -mb-1">Check in time</h3>
                  <input
                    type="text"
                    value={checkIn}
                    onChange={(ev) => setCheckIn(ev.target.value)}
                    placeholder="14:00"
                    name=""
                    id=""
                    className="focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Check out time</h3>
                  <input
                    className="focus:outline-none focus:border-primary"
                    type="text"
                    value={checkOut}
                    onChange={(ev) => setCheckOut(ev.target.value)}
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Max number of guests</h3>
                  <input
                    className="focus:outline-none focus:border-primary"
                    type="number"
                    value={maxGuest}
                    onChange={(ev) => setMaxGuest(ev.target.value)}
                  />
                </div>
              </div>
              <div>
                <button className="primary my-4">Save</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default PlacesPage;
