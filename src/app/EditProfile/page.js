"use client";
import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import Api, { BaseUrl } from "@/Api/Api";
import { ToastContainer, toast } from 'react-toastify';
import Spinner from "@/Components/Spinner";

const EditProfile = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [userimage, setUserimage] = useState(null);
  const [loading,setLoading]=useState(false)
  const [errorMsg,setErrorMsg]=useState('')

  // Profile fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Fetch user profile
  useEffect(() => {
    const GetUserinfo = async () => {
      try {
        setLoading(true)
        const res = await Api.get("profile/"); // ✅ hits your backend
        const data = res.data;
        setUserimage(data.image);

        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setCity(data.city || "");
        setState(data.state || "");
        setLoading(false)
      } catch (err) {
        console.log("Error fetching profile:", err.message);
        setLoading(false)
      }
    };
    GetUserinfo();
  }, []);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUserimage(file); // store file for upload
    }
  };

  // Handle Save
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("city", city);
      formData.append("state", state);

      if (userimage && userimage instanceof File) {
        formData.append("image", userimage);
      }

      const res = await Api.patch("profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Profile updated:", res.data);
      toast.success('Profile updated successfully!')
      setLoading(false)
      setErrorMsg("")
    } catch (err) {
      console.log("Update failed:", err.response?.data || err.message);
      setErrorMsg("❌ Update failed!");
      setLoading(false)
    }
  };
  if(loading===true){
    return<Spinner/>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 px-4 py-16">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-6 text-center">
          Edit Profile
        </h2>
        {errorMsg && 
          <h5 className="text-md text-red-400 font-bold">{errorMsg}</h5>
        }
        <p className="text-center text-gray-600 mb-10">
          Update your personal information and keep your profile up-to-date ✨
        </p>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
            <img
              src={
                previewImage
                  ? previewImage
                  : userimage
                  ? `${BaseUrl}${userimage}`
                  : "/default-avatar.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="profilePic"
              className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition"
            >
              <FaCamera size={16} />
            </label>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 text-gray-400 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 text-gray-400 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 text-gray-400 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-gray-400 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 text-gray-400 focus:ring focus:ring-purple-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 text-gray-400 focus:ring focus:ring-purple-200 outline-none transition"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-center gap-4 mt-8">
            <button
              type="button"
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold shadow hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold shadow hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
