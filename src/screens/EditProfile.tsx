/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { EDIT_PROFILE } from "../queries/Mutation";
import { useNotification } from "../context/NotificationProvider";
import Loader from "../components/Loader";
import FileInputField from "../components/form/FileInputField";

export default function EditProfile() {
  const dispatch = useNotification();
  const [img, setImg] = useState<Object | string>("");
  const [err, setErr] = useState<string>("");

  const [editProfile, { loading }] = useMutation(EDIT_PROFILE, {
    onCompleted: (data) => {
      dispatch({
        type: "SUCCESS",
        message: data.editProfile.message,
        title: "Successful Request",
      });
    },
  });

  // useEffect(() => {
  //   setUser(isAuth());
  // }, []);

  const handleChangeImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.files && event.target.files[0];
    if (!value) {
      return;
    }
    setImg(value);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (!img) setErr("Obrázek nebyl nahrán!");
      if (!err) {
        await editProfile({
          variables: {
            image: img,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="w-56 text-2xl">Nastavení profilu</h1>
      </div>
      <div className="screen_container">
        {loading && <Loader />}
        <FileInputField
          img={img}
          required={false}
          label="Profilový obrázek"
          multiple={true}
          error={err}
          handleChange={handleChangeImage}
        />
        <button className="btn" onClick={handleSubmit}>
          Uložit
        </button>
      </div>
    </div>
  );
}
