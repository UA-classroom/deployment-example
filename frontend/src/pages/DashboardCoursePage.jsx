import { useEffect, useState } from "react";
import authStore from "../store/authStore";

function DashboardCoursePage() {
  const BASE_API_URL = import.meta.env.VITE_API_URL;
  const token = authStore((state) => state.token);
  const [courses, setCourses] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form variables
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  async function fetchCourses() {
    try {
      const response = await fetch(`${BASE_API_URL}/courses/course`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  function deleteCourseFromState(courseId) {
    const newCourses = courses.filter((course) => course.id !== courseId);
    setCourses(newCourses);
  }

  async function deleteCourse(courseId) {
    try {
      const response = await fetch(
        `${BASE_API_URL}/courses/course/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      deleteCourseFromState(courseId);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteModalOpen(false);
    }
  }

  function validateForm() {
    let isValid = true;
    setCourseNameError("");

    if (!courseName.trim()) {
      setCourseNameError("Course name is required");
      isValid = false;
    }
    return isValid;
  }

  async function addCourseSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const data = JSON.stringify({
      name: courseName,
      description: description,
      is_active: isActive,
    });

    try {
      const response = await fetch(`${BASE_API_URL}/courses/course`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setShowAddModal(false);
      fetchCourses(); // Refresh the course list
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  }

  return (
    <div className="min-w-xl">
      <div className="min-h-screen my-8 bg-white border border-gray-200 shadow-md">
        {/* Delete Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex overflow-auto bg-gray-800 bg-opacity-50">
            <div className="relative flex flex-col w-full max-w-md p-8 m-auto bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Confirm Deletion</h2>
              <p className="my-4">
                Are you sure you want to delete this course?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 text-black bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteCourse(selectedCourseId)}
                  className="px-4 py-2 text-white bg-red-600 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Course Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:w-1/2">
              <form
                className="px-4 py-6 sm:p-8"
                onSubmit={addCourseSubmit}
                noValidate
              >
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* Course Name */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="course-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Course Name
                    </label>
                    <div className="mt-2">
                      <input
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        type="text"
                        name="name"
                        id="course-name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {courseNameError && (
                      <div className="text-red-700">{courseNameError}</div>
                    )}
                  </div>

                  {/* Is Active */}
                  <div className="sm:col-span-6">
                    <div className="flex items-center">
                      <input
                        id="is-active"
                        name="is-active"
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="is-active"
                        className="block ml-2 text-sm font-medium leading-6 text-gray-900"
                      >
                        Active Course
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Inactive courses won't be available for enrollment
                    </p>
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        id="description"
                        rows="5"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end px-4 py-4 border-t gap-x-6 border-gray-900/10 sm:px-8">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Course List */}
        <div className="p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Courses</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all courses
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={() => setShowAddModal(true)}
                type="button"
                className="block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Course
              </button>
            </div>
          </div>

          <div className="flow-root mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="text-sm font-semibold text-gray-900">
                          Created
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                          {course.name}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              course.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {course.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {course.description}
                        </td>
                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                          <span className="text-xs text-gray-500">
                            {new Date(course.created_at).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => {
                              setDeleteModalOpen(true);
                              setSelectedCourseId(course.id);
                            }}
                            className="ml-4 text-red-700 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCoursePage;
