import React from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const techCompanies = [
  { label: "Apple", value: 1 },
  { label: "Facebook", value: 2 },
  { label: "Netflix", value: 3 },
  { label: "Tesla", value: 4 },
  { label: "Amazon", value: 5 },
  { label: "Alphabet", value: 6 }
];

const App = () => <Select options={techCompanies} />;

export default App;
