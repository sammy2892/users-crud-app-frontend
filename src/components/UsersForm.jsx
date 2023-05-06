import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export const UsersForm = ({
  setForm,
  getUsers,
  userSelected,
  setUserSelected,
}) => {
  const { handleSubmit, register, reset } = useForm();
  const inputNull = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthday: "",
    image_url: "",
  };

  const submit = (data) => {
    console.log(data);
    if (userSelected) {
      axios
        .put(
          `https://users-crud-app.onrender.com/users/${userSelected.id}/`,
          data
        )
        .then(() => {
          getUsers();
          closeForm();
        });
    } else {
      axios
        .post(`https://users-crud-app.onrender.com/users/`, data)
        .then(() => {
          getUsers();
          closeForm();
        });
    }
  };
  const closeForm = () => {
    setForm(false);
    setUserSelected(null);
  };

  useEffect(() => {
    if (userSelected) {
      reset(userSelected);
    } else {
      reset(inputNull);
    }
  }, [userSelected]);

  return (
    <div className="container__warning">
      <div className="form">
        <button className="btn_close" onClick={() => closeForm()}>
          X
        </button>
        <h3>Users</h3>
        <form onSubmit={handleSubmit(submit)}>
          <p>
            User:
            <input
              type="email"
              placeholder="email"
              id="email"
              {...register("email")}
            />
          </p>
          <input
            type="text"
            placeholder="password"
            id="password"
            {...register("password")}
          />
          <input
            type="text"
            placeholder="first name"
            id="first_name"
            {...register("firstName")}
          />
          <input
            type="text"
            placeholder="last name"
            id="last_name"
            {...register("lastName")}
          />
          <input type="date" id="birth" {...register("birthday")} />
          <button className="btn__cru" type="submit">
            {userSelected ? "Actualizar" : "Crear"} User
          </button>
        </form>
      </div>
    </div>
  );
};
