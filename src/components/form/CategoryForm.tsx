import React, { useState, useEffect } from "react";
import { ApolloError, useMutation, useLazyQuery } from "@apollo/client";
import InputFieldAdm from "./InputFieldAdm";
import InputCheckBox from "./InputCheckBox";
import { CREATE_CATEGORY, EDIT_CATEGORY } from "../../queries/Mutation";
import { GET_CATEGORY } from "../../queries/Query";
import Loader from "../Loader";
import { validate } from "../../validators/category";

interface Props {
  id: string;
}

export interface Errors {
  name?: String;
}

export interface State {
  _id: string;
  name: String;
  hidden: Boolean;
}

function CategoryForm({ id }: Props) {
  const [formValues, setFormValues] = useState<State>({
    _id: "",
    name: "",
    hidden: false,
  });
  const [err, setErr] = useState<Errors>({});

  const [getCategory] = useLazyQuery(GET_CATEGORY, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setFormValues({ ...data.getCategory });
    },
  });

  const Mutation = id ? EDIT_CATEGORY : CREATE_CATEGORY;
  const [createCategory, { loading, error }] = useMutation(Mutation, {
    onCompleted: () => {
      setFormValues({
        _id: "",
        name: "",
        hidden: false,
      });
    },
  });

  useEffect(() => {
    if (id) {
      getCategory({
        variables: {
          getCategoryId: id,
        },
      });
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "hidden") {
      setFormValues({ ...formValues, [String(name)]: event.target.checked });
    } else {
      setFormValues({ ...formValues, [String(name)]: value });
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const errors = validate(formValues);
      setErr(errors);
      if (Object.keys(errors).length === 0) {
        await createCategory({
          variables: {
            category: {
              _id: formValues._id,
              name: formValues.name,
              hidden: formValues.hidden,
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ApolloError) {
        setErr(error.graphQLErrors[0].extensions.errors);
      }
    }
  };

  return (
    <>
      <form
        className="flex relative flex-wrap md:flex-nowrap"
        encType="multipart/form-data"
      >
        {!error && loading && <Loader />}
        {/* <span>{error && error.graphQLErrors[0].extensions.errors}</span> */}
        <div className="w-1/3">
          <InputFieldAdm
            required={true}
            type="text"
            name="name"
            label="Jméno kategorie"
            prompt="Zadejte Jméno"
            error={err?.name}
            value={formValues.name}
            handleChange={handleChange}
          />

          <InputCheckBox
            name="hidden"
            label="Zobrazení kategorie"
            checked={formValues.hidden}
            handleChange={handleChange}
          />
        </div>
      </form>
      <div className="flex mt-7 mx-auto justify-center">
        <button
          onClick={handleSubmit}
          className="py-1 px-2 bg-green-500 rounded-md"
        >
          {id ? "Aktualizovat kategorii" : "Přidat kategorii"}
        </button>
      </div>
    </>
  );
}

export default CategoryForm;
