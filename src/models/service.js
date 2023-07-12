import CustomInput from "components/CustomInput.vue";
import { requiredValidator } from "src/utils/validators";
import { createInputFields, createTableColumns } from "models/functions";
import { api } from "boot/axios"

const model = [
  {
    component: CustomInput,
    model: "code",
    attrs: {
      label: "Code",
      rules: [requiredValidator],
    },
    col: 12,
  },
  {
    component: CustomInput,
    model: "name",
    attrs: {
      label: "Name",
      rules: [requiredValidator],
    },
  },
];

export const createFields = (overrides = []) => createInputFields(model, overrides);

export const createColumns = () => createTableColumns(model);

export const getServices = async () => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(function () {
  //     resolve(JSON.parse(localStorage.getItem("services") || "[]"));
  //   }, 1000);
  // });

  const response = await api.get("/api/departments")

  return response.data
};
