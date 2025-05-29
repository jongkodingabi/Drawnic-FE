import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";

type PlayerForms = {
  initialData?: {
    name: string;
    telephone: string;
    position: string;
    age: number;
    major: string;
  };

  onSubmit: (data: any) => void;
};

const PlayerForm = ({ initialData, onSubmit }: PlayerForms) => {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      telephone: "",
      position: "",
      age: 0,
      major: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <Link to="/players">
          <button className="bg-blue-500 text-white w-20 rounded-3xl p-2 mb-8 hover:bg-blue-600 transition-colors fixed z-50 shadow-lg">
            {"<-"} Back
          </button>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="min-w-2xl mx-auto p-8 rounded-lg shadow-xl space-y-6"
        >
          <div className="grid grid-cols-2 gap-6 w-full">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="telephone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Telephone
              </label>
              <input
                id="telephone"
                name="telephone"
                placeholder="Telephone"
                value={form.telephone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Position
              </label>
              <input
                id="position"
                name="position"
                placeholder="Position"
                value={form.position}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="major"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Major
              </label>
              <input
                id="major"
                name="major"
                placeholder="Major"
                value={form.major}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Simpan
          </button>
        </form>
      </div>
    </>
  );
};

export default PlayerForm;
