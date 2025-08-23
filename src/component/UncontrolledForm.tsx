const UncontrolledForm = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="mx-auto w-full max-w-[850px] bg-white">
        <form>
          <div className={'flex flex-row gap-2'}>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="mb-1 block text-base font-medium text-[#07074D]"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="age"
                className="mb-1 block text-base font-medium text-[#07074D]"
              >
                Age
              </label>
              <input
                type="text"
                name="age"
                id="age"
                placeholder="Age"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className={'flex flex-row gap-2'}>
            <div className="mb-3">
              <label className="mb-1 block text-base font-medium text-[#07074D]">
                Password
              </label>
              <input
                className="bg-gray-50 w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                placeholder="••••••••"
                id="password"
                type="password"
              />
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-base font-medium text-[#07074D]">
                Confirm password
              </label>
              <input
                className="bg-gray-50 w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                placeholder="••••••••"
                id="confirmPassword"
                type="password"
              />
            </div>
          </div>

          <div className={'flex flex-row gap-2'}>
            <div className="mb-3 flex-1">
              <label
                htmlFor="gender"
                className="mb-1 block text-base font-medium text-[#07074D] w-full"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="mb-3 flex-1">
              <label
                htmlFor="country"
                className="mb-1 block text-base font-medium text-[#07074D]"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              >
                <option value="">Select country</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <input type="file" name="file" id="file" className="sr-only" />
            <label
              htmlFor="file"
              className="relative flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-2 text-center"
            >
              <div>
                <span className="mb-2 block text-medium font-semibold text-[#07074D]">
                  Drop files here
                </span>
                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                  Browse
                </span>
              </div>
            </label>
          </div>

          <div className="mb-3 flex items-start">
            <div className="flex items-center h-5">
              <input
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                type="checkbox"
                aria-describedby="terms"
                id="terms"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-light text-gray-500 text-gray-300">
                I accept the
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline text-primary-500"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          <div>
            <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UncontrolledForm;
