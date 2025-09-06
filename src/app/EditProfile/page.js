"use client";
import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import Api, { BaseUrl } from "@/Api/Api";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "@/Components/Spinner";

const EditProfile = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [userimage, setUserimage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
        setLoading(true);
        const res = await Api.get("profile/");
        const data = res.data;
        setUserimage(data.image);

        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setCity(data.city || "");
        setState(data.state || "");
        setLoading(false);
      } catch (err) {
        console.log("Error fetching profile:", err.message);
        setLoading(false);
      }
    };
    GetUserinfo();
  }, []);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUserimage(file);
    }
  };

  // Handle Save
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
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
      toast.success("Profile updated successfully!");
      setLoading(false);
      setErrorMsg("");
    } catch (err) {
      console.log("Update failed:", err.response?.data || err.message);
      setErrorMsg("❌ Update failed!");
      setLoading(false);
    }
  };

  if (loading === true) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-purple-50 to-purple-200 px-4 py-10">
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-8 md:p-12">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-700 mb-4 text-center">
          Edit Profile
        </h2>
        {errorMsg && (
          <h5 className="text-center text-md text-red-500 font-semibold mb-2">
            {errorMsg}
          </h5>
        )}
        <p className="text-center text-gray-600 text-sm sm:text-base mb-8">
          Update your personal information and keep your profile fresh ✨
        </p>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
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
              className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 sm:p-3 rounded-full cursor-pointer hover:bg-purple-700 transition"
            >
              <FaCamera size={16} className="sm:w-5 sm:h-5" />
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          <InputField label="First Name" value={firstName} onChange={setFirstName} />
          <InputField label="Last Name" value={lastName} onChange={setLastName} />
          <InputField label="Phone" value={phone} onChange={setPhone} />
          <InputField label="Email" type="email" value={email} onChange={setEmail} />
          <InputField label="City" value={city} onChange={setCity} />
          <InputField label="State" value={state} onChange={setState} />

          {/* Buttons */}
          <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6">
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium shadow hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-3 bg-purple-600 text-white rounded-xl font-semibold shadow hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

// Reusable InputField component
const InputField = ({ label, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 text-gray-700 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 outline-none transition text-sm sm:text-base"
    />
  </div>
);

export default EditProfile;
