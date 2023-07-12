import CustomInput from "components/CustomInput.vue";
import CustomSelect from "components/CustomSelect.vue";
import { requiredValidator, dateValidator } from "utils/validators";
import { createInputFields, createTableColumns } from "models/functions";
import { collection, getDocs, addDoc, setDoc, deleteDoc, doc } from "firebase/firestore"
import { db } from "src/boot/firebaseConnection"

const model = [
  {
    component: CustomSelect,
    model: "patient_id",
    attrs: {
      label: "Patient",
      rules: [requiredValidator],
      emitValue: true,
      mapOptions: true,
    },
    col: 12,
    field: (row) => row.patient,
    format: (val) => `${val.last_name} ${val.first_name}`,
  },
  {
    component: CustomInput,
    model: "schedule",
    attrs: {
      label: "Schedule",
      mask: "####-##-##",
      rules: [requiredValidator, dateValidator],
      placeholder: "YYYY-MM-DD",
    },
    col: 12,
    format: (val) => (val ? new Date(val).toDateString() : ""),
  },
  {
    component: CustomSelect,
    model: "service_id",
    attrs: {
      label: "Service",
      rules: [requiredValidator],
      emitValue: true,
      mapOptions: true,
    },
    col: 12,
    field: (row) => row.service.label,
  },
];

export const createFields = (overrides = []) => createInputFields(model, overrides);

export const createColumns = () => createTableColumns(model);

export const getAppointments = async () => {
  // return new Promise((resolve) => {
  //   setTimeout(function () {
  //     resolve(JSON.parse(localStorage.getItem("appointments") || "[]"));
  //   }, 1000);
  // });

  const querySnapshot = await getDocs(collection(db, "appointments"));

  let appointments = [];
  querySnapshot.forEach((doc) => {
    appointments.push({ ...doc.data(), id: doc.id });
  });

  return appointments;
};

export const createAppointment = async (data) => {
  // return new Promise((resolve) => {
  //   setTimeout(async () => {
  //     let appointments = await getAppointments();
  //     data.id = appointments.length + 1;
  //     appointments.push(data);
  //     localStorage.setItem("appointments", JSON.stringify(appointments));
  //     resolve(data);
  //   }, 1000);
  // });

  const docRef = await addDoc(collection(db, "appointments"), data);

  return docRef.id
};

export const updateAppointment = async (id, data) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(async () => {
  //     let appointments = await getAppointments();

  //     let index = appointments.findIndex(
  //       (appointment) => appointment.id === id
  //     );
  //     if (index === -1) {
  //       reject("Appointment not found");
  //       return;
  //     }

  //     appointments[index] = { ...appointments[index], ...data };
  //     localStorage.setItem("appointments", JSON.stringify(appointments));
  //     resolve(appointments[index]);
  //   }, 1000);
  // });

  await setDoc(doc(db, "appointments", id), data);

  return id
};

export const deleteAppointment = async (id) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(async () => {
  //     let appointments = await getAppointments();

  //     let index = appointments.findIndex(
  //       (appointment) => appointment.id === id
  //     );
  //     if (index === -1) {
  //       reject("Appointment not found");
  //       return;
  //     }

  //     appointments.splice(index, 1);
  //     localStorage.setItem("appointments", JSON.stringify(appointments));
  //     resolve(appointments[index]);
  //   }, 1000);
  // });

  await deleteDoc(doc(db, "appointments", id));

  return id
};
