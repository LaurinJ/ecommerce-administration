import React, { useState, useEffect } from "react";
import { ApolloError, useMutation, useLazyQuery } from "@apollo/client";
import InputFieldAdm from "./InputFieldAdm";
import InputCheckBox from "./InputCheckBox";
import { CREATE_CATEGORY, EDIT_CATEGORY } from "../../queries/Mutation";
import { GET_CATEGORIES, GET_CATEGORY } from "../../queries/Query";
import Loader from "../Loader";
import { validate } from "../../validators/category";
import { CategoryErrors, Category } from "../../type/category";
import { useNotification } from "../../context/NotificationProvider";

interface Props {
  id: string;
}

function CategoryForm({ id }: Props) {
  const dispatch = useNotification();
  const [formValues, setFormValues] = useState<Category>({
    _id: "",
    name: "",
    hidden: false,
  });
  const [err, setErr] = useState<CategoryErrors>({});

  const [getCategory] = useLazyQuery(GET_CATEGORY, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setFormValues({ ...data.getCategory });
    },
  });

  const Mutation = id ? EDIT_CATEGORY : CREATE_CATEGORY;
  const [createCategory, { loading }] = useMutation(Mutation, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      setFormValues({
        _id: "",
        name: "",
        hidden: false,
      });
      dispatch({
        type: "SUCCESS",
        message: "Kategorie byla vytvořena!",
        title: "Successful Request",
      });
    },
    refetchQueries: [GET_CATEGORIES],
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
        {loading && <Loader />}
        <div className="w-1/3">
          <InputFieldAdm
            required={true}
            type="text"
            name="name"
            label="Název kategorie"
            prompt="Zadejte název"
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
        <button onClick={handleSubmit} className="btn">
          {id ? "Aktualizovat kategorii" : "Přidat kategorii"}
        </button>
      </div>
    </>
  );
}

export default CategoryForm;
