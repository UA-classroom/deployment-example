import React from "react";

export default function IndexPage() {
  return (
    <main>
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="/index_img_2.webp"
                alt="Students in vocational training"
              />
              <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply"></div>
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Empower Your</span>
                <span className="block text-indigo-200">
                  Vocational Education
                </span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                A comprehensive system for managing students, programs, grades,
                and progress in vocational education institutions.
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                  >
                    Get started
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                  >
                    Live demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="features" className="py-16 bg-white overflow-hidden lg:py-24">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="relative">
            <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to manage vocational education
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
              Streamline administration, enhance student outcomes, and simplify
              reporting with our all-in-one platform.
            </p>
          </div>

          <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                Comprehensive Student Management
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                Track student progress, manage enrollments, and monitor
                performance all in one unified platform designed specifically
                for vocational education.
              </p>

              <dl className="mt-10 space-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <i className="fas fa-user-graduate"></i>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Student Profiles
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Detailed student records with academic history, skills
                    assessments, and personalized learning paths.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Progress Tracking
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Real-time monitoring of skills acquisition, competency
                    achievements, and program milestones.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <i className="fas fa-clipboard-check"></i>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Assessment Management
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Create, assign, and grade both theoretical and practical
                    assessments with easy-to-use tools.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
              <img
                className="relative mx-auto rounded-lg shadow-lg"
                src="/index_img_1.webp"
                alt="Dashboard screenshot"
              />
            </div>
          </div>

          <div className="relative mt-12 sm:mt-16 lg:mt-24">
            <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="lg:col-start-2">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  Program & Curriculum Management
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Design, implement, and manage vocational programs with tools
                  that align with industry standards and regulatory
                  requirements.
                </p>

                <dl className="mt-10 space-y-10">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <i className="fas fa-book"></i>
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Curriculum Builder
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Create structured learning paths with modular components
                      that can be customized for different vocational programs.
                    </dd>
                  </div>

                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <i className="fas fa-industry"></i>
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Industry Alignment
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Map curriculum components to industry certifications and
                      workforce needs to ensure relevance.
                    </dd>
                  </div>

                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Schedule Management
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Coordinate classroom schedules, lab time, and workplace
                      training with an intuitive calendar interface.
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                <img
                  className="relative mx-auto rounded-lg shadow-lg"
                  src="/index_img_1.webp"
                  alt="Program management screenshot"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
