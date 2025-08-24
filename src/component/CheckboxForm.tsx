const CheckboxForm = ({
  error,
}: {
  error: { message: string } | undefined;
}) => {
  return (
    <div className={'mb-3'}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            className="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
            type="checkbox"
            aria-describedby="terms"
            name="terms"
            id="terms"
            required={true}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-light text-gray-500">
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
      {!!error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
};

export default CheckboxForm;
