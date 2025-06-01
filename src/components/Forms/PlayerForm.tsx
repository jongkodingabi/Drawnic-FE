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
        {/* <Link to="/players">
          <button className="bg-blue-500 text-white w-20 rounded-3xl p-2 mb-8 hover:bg-blue-600 transition-colors fixed z-50 shadow-lg">
            {"<-"} Back
          </button>
        </Link> */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-2xl space-y-8 mt-10 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Player Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Enter player's name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label
                htmlFor="telephone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Telephone
              </label>
              <input
                id="telephone"
                name="telephone"
                placeholder="Enter telephone number"
                value={form.telephone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Position
              </label>
              <input
                id="position"
                name="position"
                placeholder="Enter position"
                value={form.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min={0}
                placeholder="Enter age"
                value={form.age}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="major"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Major
              </label>
              <input
                id="major"
                name="major"
                placeholder="Enter major"
                value={form.major}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 transition"
          >
            Save Player
          </button>
        </form>
      </div>
    </>
  );
};

export default PlayerForm;
