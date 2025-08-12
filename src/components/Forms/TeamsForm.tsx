import { useState } from "react";
// import { Link } from "react-router-dom";

type TeamForms = {
  initialData?: {
    name: string;
    color: string;
  };

  onSubmit: (data: any) => void;
};

const TeamsForm = ({ initialData, onSubmit }: TeamForms) => {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      color: "",
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {/* <Sidebar /> */}
        {/* <Link to="/teams">
          <button className="bg-blue-500 text-white w-20 rounded-3xl p-2 mb-8 hover:bg-blue-600 transition-colors fixed z-50 shadow-lg">
            {"<-"} Back
          </button>
        </Link> */}
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
                htmlFor="color"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Color
              </label>
              <input
                id="color"
                name="color"
                placeholder="Color"
                value={form.color}
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

export default TeamsForm;
