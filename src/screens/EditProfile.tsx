/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { editProfile as editProfileAct } from "../actions/auth";
import { EDIT_PROFILE } from "../queries/Mutation";
import { useNotification } from "../context/NotificationProvider";
import Loader from "../components/Loader";
import FileInputField from "../components/form/FileInputField";
import { userData } from "../apollo-client";
import { User } from "../type/user";

export default function EditProfile() {
  const dispatch = useNotification();
  const [img, setImg] = useState<Object | string>("");
  const [err, setErr] = useState<string>("");

  const [editProfile, { loading }] = useMutation(EDIT_PROFILE, {
    onCompleted: (data) => {
      if (data.editProfile.message) {
        dispatch({
          type: "BAD",
          message: data.editProfile.message,
          title: "Successful Request",
        });
        return;
      }
      editProfileAct(data.editProfile, (user: User) => {
        userData(user);
        dispatch({
          type: "SUCCESS",
          message: "Profil byl aktualizován",
          title: "Successful Request",
        });
      });
    },
  });

  const handleChangeImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.files && event.target.files[0];
    if (!value) {
      return;
    }
    setImg(value);
    setErr("");
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (!img) {
        setErr("Obrázek nebyl nahrán!");
        return;
      }
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
